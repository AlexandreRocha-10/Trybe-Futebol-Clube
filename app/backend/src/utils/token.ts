import { SignOptions } from 'jsonwebtoken';
import jwt = require('jsonwebtoken');

interface JwtPayload {
  email: string;
  role: string;
}

const secretKey: string = process.env.JWT_SECRET || 'jwt_secret';

const configJWT: SignOptions = {
  expiresIn: '2d',
  algorithm: 'HS256',
};

const generateToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, secretKey, configJWT);
  return token;
};

const validToken = (token: string) => {
  try {
    const jwtPayload = jwt.verify(token, secretKey);
    return { message: jwtPayload, type: null };
  } catch (err) {
    return { message: 'Expired or invalid token', type: 'unauthorized' };
  }
};

export { generateToken, validToken };
