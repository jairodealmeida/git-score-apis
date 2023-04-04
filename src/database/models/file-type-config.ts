import { Schema, model, Document } from 'mongoose';

export interface IFileTypeConfig extends Document {
  fileType: string;
  pointsPerLine: number;
  pointsPerImport: number;
}

const fileTypeConfigSchema = new Schema<IFileTypeConfig>({
  fileType: { type: String, required: true },
  pointsPerLine: { type: Number, required: true },
  pointsPerImport: { type: Number, required: true },
});

const FileTypeConfig = model<IFileTypeConfig>('FileTypeConfig', fileTypeConfigSchema);

export default FileTypeConfig;
