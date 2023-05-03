import { Injectable } from '@nestjs/common';
import { ICommit } from './commit.entity';
import { Commit, Repository, StatusFile } from 'nodegit';
import { HistoryEventEmitter } from 'nodegit/commit';

@Injectable()
export class CommitService {
  async getCommitsByAuthor(
    author: string,
    repositoryPath: string,
    startDate: Date = this.getDefaultFirstDay(),
    endDate: Date = this.getDefaultPeriod(), // Default to 30 days ago
  ): Promise<ICommit[]> {
    const repository = await Repository.open(repositoryPath);
    const headCommit = await repository.getHeadCommit();
    const history = headCommit.history();

    const commits: ICommit[] = [];

    history.on('commit', async function (commit: Commit) {
      const commitDate = commit.date();

      if (
        commit.author().name() === author &&
        commitDate >= startDate &&
        commitDate <= endDate
      ) {
        const files: string[] = await this.getCommitFiles(commit);
        const diffFiles = await this.getCommitDiffFiles(commit);
        commits.push(this.getICommitFrom(commit));
      }
    });

    await this.iterateHistory(history);

    return commits;
  }

  getDefaultFirstDay() {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }

  getDefaultPeriod() {
    return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default to 30 days ago
  }

  async getICommitFrom(commit: Commit): Promise<ICommit> {
    const files: string[] = await this.getCommitFiles(commit);
    const diffFiles = await this.getCommitDiffFiles(commit);
    return {
      hash: commit.sha(),
      message: commit.message(),
      author: commit.author().name(),
      email: commit.author().email(),
      timestamp: commit.timeMs(),
      sha: commit.sha(),
      url: '',
      date: commit.date(),
      repository: '',
      branch: '',
      files: files.map((file) => ({
        filename: file,
        status: diffFiles[file],
        type: '',
        //metrics: null,
      })),
    };
  }

  async getCommitFiles(commit: Commit): Promise<string[]> {
    const files: string[] = [];

    const tree = await commit.getTree();
    const walker = tree.walk();

    walker.on('entry', function (entry) {
      files.push(entry.path());
      console.log(entry);
    });
    walker.start();

    return files;
  }

  async getCommitDiffFiles(commit: Commit): Promise<{ [key: string]: any }> {
    const diffList = await commit.getDiff();
    const diffFiles: { [key: string]: any } = {};

    const patches = await diffList[0].patches();
    patches.forEach((patch) => {
      const filename = patch.newFile().path();
      diffFiles[filename] = {
        status: patch.status(),
        added: patch.isAdded(),
        deleted: patch.isDeleted(),
        modified: patch.isModified(),
      };
    });

    return diffFiles;
  }

  async iterateHistory(history: HistoryEventEmitter): Promise<void> {
    return new Promise((resolve, reject) => {
      history.on('end', function () {
        resolve();
      });
      history.on('error', function (error) {
        reject(error);
      });
      history.start();
    });
  }
}
