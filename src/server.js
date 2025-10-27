import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import studentsRouter from './routers/students.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getApiInfo } from './utils/readApiInfo.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', async (req, res) => {
    const apiInfo = await getApiInfo();
    res.json({ apiInfo });
  });

  app.use(studentsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
