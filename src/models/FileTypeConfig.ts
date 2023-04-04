import { Document, Model, model, Schema } from 'mongoose';

interface IFileTypeConfig extends Document {
  fileName: string;
  baseScore: number;
  bonusKeywords: Array<string>;
  penaltyKeywords: Array<string>;
}

const FileTypeConfigSchema: Schema = new Schema({
  fileName: { type: String, required: true, unique: true },
  baseScore: { type: Number, required: true },
  bonusKeywords: [{ type: String }],
  penaltyKeywords: [{ type: String }],
});

export const FileTypeConfigModel: Model<IFileTypeConfig> = model<IFileTypeConfig>(
  'FileTypeConfig',
  FileTypeConfigSchema,
);
