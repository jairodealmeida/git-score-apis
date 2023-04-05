
/**
 * Esse model representa a configuração de cada tipo de arquivo que pode ser comitado no repositório. Ele possui uma propriedade fileType para armazenar o tipo do arquivo (ex: .js, .css, .html, etc.) e uma propriedade metrics que é um array de strings que representa as métricas que podem ser calculadas para esse tipo de arquivo.
 */
import { Schema, model, Document } from "mongoose";

interface IFileTypeConfig {
  fileType: string;
  metrics: string[];
}

export type FileTypeConfigDocument = IFileTypeConfig & Document;

const fileTypeConfigSchema = new Schema({
  fileType: { type: String, required: true },
  metrics: [{ type: String, required: true }],
});

/*export const FileTypeConfig = model<FileTypeConfigDocument>(
  "FileTypeConfig",
  fileTypeConfigSchema
);*/
export default model<FileTypeConfigDocument>('FileTypeConfig', fileTypeConfigSchema);