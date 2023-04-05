/*import Commit, { CommitDocument } from "../database/models/commit";
import FileTypeConfig, {FileTypeConfigDocument} from "../database/models/file-type-config";
import ScoreConfig from "../database/models/score-config";

export default class CommitService {
  public static async calculateTotalScore(commitId: string): Promise<number> {
    const commit: CommitDocument | null = await Commit.findById(commitId);

    if (!commit) {
      throw new Error(`Commit ${commitId} not found`);
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
        const metricValue = file.metrics[scoreConfig.metric as keyof typeof file.metrics];
        totalScore += metricValue * scoreConfig.weight;
      }
    }

    return totalScore;
  }
}
*/
/*
import { Document, ObjectId } from 'mongoose';
import Commit, { CommitDocument,ICommit } from './commit.models';
import FileTypeConfig, { FileTypeConfigDocument } from '../file/filetypeconfig.models';
import ScoreConfig, { ScoreConfigDocument } from '../score/scoreconfig.models';

export default class CommitService {
  update(commitId: any, body: any) {
    throw new Error("Method not implemented.");
  }
  async create(commitData: ICommit): Promise<CommitDocument> {
    const commit = new Commit(commitData);
    return commit.save();
  }

  async getAll(): Promise<CommitDocument[]> {
    return Commit.find().lean().exec();
  }

  async getById(id: string): Promise<CommitDocument | null> {
    return Commit.findById(id).lean().exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await Commit.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }

  public async calculateScore(commitId: string): Promise<number> {
    const commit: CommitDocument | null = await Commit.findById(commitId);

    if (!commit) {
      throw new Error(`Commit with ID '${commitId}' not found`);
    }

    let totalScore = 0;

    for (const file of commit.files) {
      const fileTypeConfig: FileTypeConfigDocument | null = await FileTypeConfig.findOne({ fileType: file.type });

      if (!fileTypeConfig) {
        throw new Error(`File type '${file.type}' not found in file type configurations`);
      }

      const scoreConfigs: ScoreConfigDocument[] = await ScoreConfig.find({
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

 }*/
