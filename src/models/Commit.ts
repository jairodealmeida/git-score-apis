import { Document, Model, model, Schema } from 'mongoose';

interface ICommit extends Document {
  userId: Schema.Types.ObjectId;
  files: Array<string>;
  score: number;
}

const CommitSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  files: [{ type: String }],
  score: { type: Number, required: true },
});

export const CommitModel: Model<ICommit> = model<ICommit>('Commit', CommitSchema);
