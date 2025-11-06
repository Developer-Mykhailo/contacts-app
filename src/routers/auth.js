// express — створення маршрутизаторів (Router) для організації маршрутів за модулями
import { Router } from 'express';

// ctrlWrapper — утиліта, що обгортає контролери, автоматично обробляючи асинхронні помилки без try/catch
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// validateBody — middleware для перевірки тіла запиту (req.body) за схемою валідації перед виконанням контролера
import { validateBody } from '../middlewares/validateBody.js';

import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

export default router;
