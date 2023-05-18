import { Router } from 'express';
import { MatchController } from '../controllers';
import validateToken from '../middlewares/validateToken';
import validateMatch from '../middlewares/validateMatch';

const matchRouter = Router();

matchRouter.get('/', MatchController.getMatchs);
matchRouter.patch('/:id/finish', validateToken, MatchController.updateStatus);
matchRouter.patch('/:id', validateToken, MatchController.updateGoals);
matchRouter.post('/', validateToken, validateMatch, MatchController.addMatch);

export default matchRouter;
