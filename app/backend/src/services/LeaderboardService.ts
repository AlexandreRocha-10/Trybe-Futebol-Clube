import { QueryTypes } from 'sequelize';
import { homeQuery, awayQuery, totalQuery } from '../utils/queries';
import sequelize from '../database/models';

class LeaderboardService {
  public static async getHomeLeaderboard() {
    const homeleaderboard = await sequelize.query(homeQuery, { type: QueryTypes.SELECT });
    return homeleaderboard;
  }

  public static async getAwayLeaderboard() {
    const awayleaderboard = await sequelize.query(awayQuery, { type: QueryTypes.SELECT });
    return awayleaderboard;
  }

  public static async getLeaderboard() {
    const leaderboard = await sequelize.query(totalQuery, { type: QueryTypes.SELECT });
    return leaderboard;
  }
}

export default LeaderboardService;
