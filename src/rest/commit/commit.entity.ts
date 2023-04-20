//export class Commit {}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface ICommit {
  id?: number;
  sha: string;
  url: string;
  hash: string;
  message: string;
  author: string;
  email: string;
  date: Date;
  timestamp: number;
  repository: string;
  branch: string;
  files: {
    filename: string;
    type: string;
    status: number;
    //metrics: Record<string, number>;
  }[];
}

@Entity()
export class CommitEntity implements ICommit {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  sha: string;

  @Column()
  url: string;

  @Column()
  hash: string;

  @Column()
  message: string;

  @Column()
  author: string;

  @Column()
  email: string;

  @Column()
  date: Date;

  @Column()
  timestamp: number;

  @Column()
  repository: string;

  @Column()
  branch: string;

  @Column('json')
  files: {
    filename: string;
    type: string;
    status: number;
    //metrics: Record<string, number>;
  }[];
}
