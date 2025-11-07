// express — створення маршрутизаторів (Router) для організації маршрутів за модулями
import { Router } from 'express';

// ctrlWrapper — утиліта, що обгортає контролери, автоматично обробляючи асинхронні помилки без try/catch
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// validateBody — middleware для перевірки тіла запиту (req.body) за схемою валідації перед виконанням контролера
import { validateBody } from '../middlewares/validateBody.js';

import {
  createStudentController,
  deleteStudentController,
  getStudentsByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/students.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { upload } from '../middlewares/multer.js';

const router = Router();
router.use(authenticate);

//---------------------------------------------------------------
router.get(
  '/',
  ctrlWrapper(checkRoles(ROLES.TEACHER)),
  ctrlWrapper(getStudentsController),
);

router.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getStudentsByIdController),
);

router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  upload.single('photo'),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

router.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteStudentController),
);

export default router;
