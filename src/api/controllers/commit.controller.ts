import { Request, Response } from 'express';
import { CommitService } from '../services/commit.service';

export class CommitController {
  private commitService: CommitService;

  constructor(commitService: CommitService) {
    this.commitService = commitService;
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { repositoryUrl, branchName, commitHash } = req.body;

    try {
      const score = await this.commitService.calculateScore(repositoryUrl, branchName, commitHash);
      res.status(201).json({ score });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}
