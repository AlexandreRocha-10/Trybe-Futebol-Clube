import { Response, Request } from 'express';
import { UserService } from '../services';
import { mapError } from '../utils/errorMap';

class UserController {
  public static async login(req: Request, res: Response) {
    const { type, message } = await UserService.getUser(req.body);
    if (type) return res.status(mapError(type)).json({ message });

    return res.status(200).json(message);
  }

  public static getRole(req: Request, res: Response) {
    const { role } = req.body.result.message;

    return res.status(200).json({ role });
  }
}

export default UserController;
