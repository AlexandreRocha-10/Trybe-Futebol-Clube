import { Router } from 'express';
import { UserController } from '../controllers';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const loginRouter = Router();

loginRouter.post('/', validateLogin, UserController.login);
loginRouter.get('/role', validateToken, UserController.getRole);

export default loginRouter;
