/*import { Request, Response } from 'express';
import CommitService from '../../services/commit.service';

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
}*/


import { Request, Response } from "express";
import {CommitService} from "./commit.services";

export class CommitController {

  constructor(private readonly commitService: CommitService) {}

  /*public async create(req: Request, res: Response): Promise<Response> {

    const commit = await this.commitService.create(req.body);
    return res.status(201).json({ commit });
  }

  public async getCommits(req: Request, res: Response): Promise<Response> {
 
    const commits = await this.commitService.getAll();
    return res.json({ commits });
  }

  public async getCommitById(req: Request, res: Response): Promise<Response> {
    
    const commit = await this.commitService.getById(req.params.commitId);
    return res.json({ commit });
  }

  public async updateCommit(req: Request, res: Response): Promise<Response> {
    
    const commit = await this.commitService.update(req.params.commitId, req.body);
    return res.json({ commit });
  }

  

  public async deleteCommit(req: Request, res: Response): Promise<Response> {
    
    await this.commitService.delete(req.params.commitId);
    return res.sendStatus(204);
  }*/
  public async getCommitsByAuthor(req: Request, res: Response): Promise<Response> {
 
    const commits = await this.commitService.getCommitsByAuthor("jairodealmeida@gmail.com","https://github.com/jairodealmeida/git-score-apis");
    return res.json({ commits });
  }

  
}
