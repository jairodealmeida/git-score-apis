/**
 * Este modelo define a estrutura de dados e o esquema para os objetos ScoreConfig. O objeto ScoreConfig armazena as informações de configuração do peso e métrica para cada tipo de arquivo. A interface IScoreConfig define os campos do objeto ScoreConfig, enquanto o ScoreConfigSchema define como esses campos serão armazenados no banco de dados MongoDB. Além disso, a exportação padrão do modelo é criada usando a função model do Mongoose, que é usado para criar uma instância do modelo a partir de um esquema definido.
 */
import { Document, Schema, model } from "mongoose";

export interface IScoreConfig {
  fileType: string;
  metric: string;
  weight: number;
}

export type ScoreConfigDocument = Document & IScoreConfig;

const ScoreConfigSchema = new Schema<ScoreConfigDocument>({
  fileType: { type: String, required: true },
  metric: { type: String, required: true },
  weight: { type: Number, required: true },
});

export default model<ScoreConfigDocument>("ScoreConfig", ScoreConfigSchema);
