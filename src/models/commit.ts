import { Schema, model, Document } from 'mongoose';

interface ICommit extends Document {
  sha: string;
  author: string;
  message: string;
  date: Date;
  fileTypePoints: { [key: string]: number };
  totalPoints: number;
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
