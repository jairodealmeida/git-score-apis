import Commit, { CommitDocument } from "../database/models/commit";
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
