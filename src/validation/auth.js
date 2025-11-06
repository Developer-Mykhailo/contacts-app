// Joi — бібліотека для валідації даних (створення схем перевірки об’єктів, наприклад req.body)
import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

//---------------------------------------------------------------

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

//---------------------------------------------------------------

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
