import { Document, Model, model, Schema } from 'mongoose';
import { IFileTypeConfig } from './file-type-config';

interface IScoreConfig extends Document {
  name: string;
  baseScore: number;
  fileTypeConfigs: Array<IFileTypeConfig>;
}

const ScoreConfigSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  baseScore: { type: Number, required: true },
  fileTypeConfigs: [{ type: Schema.Types.ObjectId, ref: 'FileTypeConfig' }],
});


const ScoreConfig = model<IScoreConfig>('ScoreConfig', ScoreConfigSchema);
export default ScoreConfig;