import bcrypt = require('bcryptjs');
import UserModel from '../database/models/UserModel';
import validateLoginFields from './validations/validateInputValues';
import { generateToken } from '../utils/token';
import { Login } from '../interfaces';

class UserService {
  public static async getUser({ email, password }: Login) {
    const error = validateLoginFields({ email, password });
    if (error.type) return error;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) return { type: 'unauthorized', message: 'Invalid email or password' };

    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) return { type: 'unauthorized', message: 'Invalid email or password' };

    const { role } = user;

    const token = generateToken({ email, role });
    return { type: null, message: { token } };
  }
}
export default UserService;
