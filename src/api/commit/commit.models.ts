import { Document, Schema, model } from 'mongoose';
export interface ICommit {
  hash: any;
  timestamp: Date;
  sha: string;
  url: string;
  message: string;
  author: string;
  date: Date;
  repository: string;
  branch: string;
  files: {
    filename: string;
    type: string;
    metrics: Record<string, number>;
  }[];
}

export type CommitDocument = ICommit & Document;

const commitSchema = new Schema({
  sha: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  message: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: true },
  repository: { type: String, required: true },
  branch: { type: String, required: true },
  files: [
    {
      filename: { type: String, required: true },
      type: { type: String, required: true },
      metrics: { type: Schema.Types.Mixed, required: true },
    },
  ],
});

export default model<CommitDocument>('Commit', commitSchema);
