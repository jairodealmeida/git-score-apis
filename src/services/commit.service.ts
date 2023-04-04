import Commit, {ICommit} from "../database/models/commit";
import ScoreConfig from "../database/models/score-config";
import FileTypeConfig, { IFileTypeConfig } from "../database/models/file-type-config";
/**
 * Basicamente, o serviço CommitService é responsável por lidar com a lógica de negócio relacionada aos commits e sua pontuação. 
 * Ele utiliza os modelos do banco de dados para buscar informações e realizar cálculos.
 * Aqui temos alguns métodos básicos como create para criar um novo commit, getAll para buscar todos os 
 * commits cadastrados e getCommitById para buscar um commit específico por seu ID.
 * Também temos o método calculateScore que realiza o cálculo da pontuação de um commit baseado nas 
 * configurações de pontuação definidas para cada tipo de arquivo e métrica.
 * É importante notar que este é apenas um exemplo e que a implementação real do 
 * serviço pode variar dependendo das necessidades específicas do projeto.
 */
export class CommitService {
  static async create(commitData: Partial<ICommit>): Promise<ICommit> {
    const commit = new Commit(commitData);
    await commit.save();
    return commit;
  }

  static async getAll(): Promise<ICommit[]> {
    const commits = await Commit.find();
    return commits;
  }

  static async getCommitById(commitId: string): Promise<ICommit | null> {
    const commit = await Commit.findById(commitId);
    return commit;
  }
  /*async findById(id: string): Promise<ICommitWithFiles | null> {
    const commit = await Commit.findById(id).populate("author").exec();
    if (!commit) return null;
  
    const files = await FileTypeConfig.find({ fileType: { $in: commit.fileTypes } });
    const commitWithFiles: ICommitWithFiles = {
      ...commit.toObject(),
      files,
    };
    return commitWithFiles;
  }*/
  static async calculateScore(commitId: string): Promise<number> {
    const commit = await Commit.findById(commitId);

    if (!commit) {
      throw new Error("Commit not found");
    }

    let totalScore = 0;

    for (const file of commit.files) {
      const fileTypeConfig = await FileTypeConfig.findOne({ fileType: file.type });

      if (!fileTypeConfig) {
        throw new Error(`File type '${file.type}' not found in file type configurations`);
      }

      const scoreConfigs = await ScoreConfig.find({
        fileType: file.type,
        metric: { $in: fileTypeConfig.metrics },
      });

      for (const scoreConfig of scoreConfigs) {
        const metricValue = file.metrics[scoreConfig.metric];
        totalScore += metricValue * scoreConfig.weight;
      }
    }

    return totalScore;
  }
}
