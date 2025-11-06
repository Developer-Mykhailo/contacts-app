// isValidObjectId — функція з mongoose для перевірки, чи є рядок валідним MongoDB ObjectId
import { isValidObjectId } from 'mongoose';

// http-errors — створення стандартних HTTP-помилок (наприклад, 400, 404, 500) для зручної обробки помилок у маршрутах
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { studentId } = req.params;

  if (!isValidObjectId(studentId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
