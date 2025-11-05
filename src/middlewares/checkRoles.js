import createHttpError from 'http-errors';
import { StudentsCollection } from '../db/models/student.js';
import { ROLES } from '../constants/index.js';

export const checkRoles =
  (...roles) =>
  async (req, res) => {
    const { user } = req;

    if (!user) throw createHttpError(401);

    const { role } = user;
    if (roles.includes(ROLES.TEACHER) && role === ROLES.TEACHER) return;

    if (roles.includes(ROLES.PARENT) && role === ROLES.PARENT) {
      const { studentId } = req.params;

      if (!studentId) throw createHttpError(403);

      const student = await StudentsCollection.findOne({
        _id: studentId,
        parentId: user._id,
      });

      if (student) return;
    }

    throw createHttpError(403);
  };
