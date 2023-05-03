import { Injectable } from '@nestjs/common';
import { ICommit } from './commit.entity';
import { Commit, Repository, StatusFile } from 'nodegit';
import * as NodeGit from 'nodegit';
import { HistoryEventEmitter } from 'nodegit/commit';
import * as fs from 'fs';
import * as path from 'path';
/**
 TODO Implementing 
 Next step : 
  1 - Detailed comits from remote - ok
  2 - implement lasy get all comits  without details
  3 - Details commit from id
  4 - Pagination
 */
@Injectable()
export class CommitService {
  async getCommitsByAuthor(
    author: string,
    repositoryUrl: string,
    startDate: Date = this.getDefaultFirstDay(),
    endDate: Date = this.getDefaultPeriod(), // Default to 30 days ago
    branchName = 'master',
  ): Promise<ICommit[]> {
    const currentDir = process.cwd();
    const localRepoPath = path.join(currentDir, 'localRepo', branchName);

    if (!fs.existsSync(localRepoPath)) {
      await NodeGit.Clone(repositoryUrl, localRepoPath);
    }

    const repository = await Repository.open(localRepoPath);
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
        commits.push(await getICommitFrom(commit));
      }
    });

    await this.iterateHistory(history);

    return commits;
  }

  getDefaultFirstDay() {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }

  getDefaultPeriod() {
    const now = new Date();
    const lastDayOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    );
    lastDayOfPreviousMonth.setDate(lastDayOfPreviousMonth.getDate() + 1);
    lastDayOfPreviousMonth.setHours(-1);
    return lastDayOfPreviousMonth;
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
async function getCommitFiles(
  commit: Commit,
): Promise<string[] | PromiseLike<string[]>> {
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
async function getICommitFrom(
  commit: Commit,
): Promise<ICommit | PromiseLike<ICommit>> {
  const files: string[] = await getCommitFiles(commit);
  const diffFiles = await getCommitDiffFiles(commit);
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
async function getCommitDiffFiles(
  commit: Commit,
): Promise<{ [key: string]: any }> {
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
