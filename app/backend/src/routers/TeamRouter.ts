import { Router } from 'express';
import { TeamController } from '../controllers';

const teamRouter = Router();

teamRouter.get('/', TeamController.getTeams);

teamRouter.get('/:id', TeamController.getTeamById);

export default teamRouter;
