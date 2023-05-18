import joi = require('joi');
import { StringSchema } from 'joi';

interface Login {
  email: string;
  password: string;
}

interface success {
  type: null;
  message: string;
}

interface error {
  type: string;
  message: string;
}

const emailSchema: StringSchema = joi.string().email().required();
const passwordSchema: StringSchema = joi.string().min(7).required();

const loginSchema = joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const validateLoginFields = ({ email, password }: Login): success | error => {
  const { error } = loginSchema.validate({ email, password });
  if (error) return { type: 'unauthorized', message: 'Invalid email or password' };
  return { type: null, message: '' };
};

export default validateLoginFields;
