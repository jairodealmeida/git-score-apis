import { Injectable } from '@nestjs/common';
import * as nodegit from 'nodegit';
import  { ICommit } from './commit.models';

@Injectable()
export class CommitService {
  async getCommitsByAuthor(author: string, repositoryPath: string): Promise<ICommit[]> {
    const repository = await nodegit.Repository.open(repositoryPath);
    const headCommit = await repository.getHeadCommit();
    const history = headCommit.history();

    const commits: ICommit[] = [];
    history.on('commit', (commit) => {
      if (commit.author().name() === author) {
        commits.push({
          hash: commit.sha(),
          message: commit.message(),
          author: commit.author().name(),
          timestamp: commit.timeMs(),
          sha: '',
          url: '',
          date: undefined,
          repository: '',
          branch: '',
          files: []
        });
      }
    });

    return new Promise((resolve, reject) => {
      history.on('end', () => resolve(commits));
      history.on('error', (err) => reject(err));
      history.start();
    });
  }
}
