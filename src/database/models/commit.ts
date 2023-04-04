/*export interface ICommit extends Document {
  sha: string;
  author: string;
  message: string;
  date: Date;
  fileTypePoints: { [key: string]: number };
  totalPoints: number;
  files: IFileTypeConfig[];
}

const commitSchema = new Schema<ICommit>({
  sha: { type: String, required: true },
  author: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, required: true },
  fileTypePoints: { type: Map, of: Number, required: true },
  totalPoints: { type: Number, required: true },
});

const Commit = model<ICommit>('Commit', commitSchema);

export default Commit;
*/

import { Document, Schema, model } from 'mongoose';
export interface ICommit {
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
