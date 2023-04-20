import { Injectable } from '@nestjs/common';
import { CreateCommitDto } from './create-commit.dto';
import { UpdateCommitDto } from './update-commit.dto';
import { ICommit } from './commit.entity';
import { Commit, Repository, StatusFile } from 'nodegit';

@Injectable()
export class CommitService {
  async getCommitsByAuthor(
    author: string,
    repositoryPath: string,
  ): Promise<ICommit[]> {
    const repository = await Repository.open(repositoryPath);
    const headCommit = await repository.getHeadCommit();
    const history = headCommit.history();

    const commits: ICommit[] = [];
    history.on('commit', async function (commit: Commit) {
      if (commit.author().name() === author) {
        const files: string[] = [];
        const tree = await commit.getTree();
        const walker = tree.walk();
        walker.on('entry', function (entry) {
          files.push(entry.path());
          console.log(entry);
        });
        walker.start();

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
        commits.push({
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
        });
      }
    });

    // This converts the iterator into a promise that resolves when the iteration is complete
    return new Promise((resolve, reject) => {
      history.on('end', function () {
        resolve(commits);
      });
      history.on('error', function (error) {
        reject(error);
      });
      history.start();
    });
  }

  /*async getStatusOfFile(repoPath: string, filePath: string) {
    const repo = await Repository.open(repoPath);

    const statusFile = await StatusFile.create(repo, filePath);

    return statusFile.status();
  }*/
}
