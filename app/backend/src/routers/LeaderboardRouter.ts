import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderboardController.getHomeLeaderboard);
leaderboardRouter.get('/away', LeaderboardController.getAwayLeaderboard);
leaderboardRouter.get('/', LeaderboardController.getLeaderboard);

export default leaderboardRouter;
