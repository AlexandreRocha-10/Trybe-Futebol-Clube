import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

class LeaderboardController {
  public static async getHomeLeaderboard(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getHomeLeaderboard();
    return res.status(200).json(leaderboard);
  }

  public static async getAwayLeaderboard(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getAwayLeaderboard();
    return res.status(200).json(leaderboard);
  }

  public static async getLeaderboard(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getLeaderboard();
    return res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
