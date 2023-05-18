import { Request, Response, NextFunction } from 'express';
import { validToken } from '../utils/token';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) { return res.status(401).json({ message: 'Token not found' }); }

  const result = validToken(token);
  req.body.result = result;

  if (result.type === 'unauthorized') {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateToken;
