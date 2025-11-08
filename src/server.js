// express — фреймворк для створення веб-серверів і REST API
import express from 'express';

// pino-http — middleware для логування HTTP-запитів і відповідей у форматі JSON
import pino from 'pino-http';

// cors — middleware, що дозволяє або обмежує запити з інших доменів (Cross-Origin Resource Sharing)
import cors from 'cors';

// cookie-parser — middleware для парсингу cookie з HTTP-запитів у req.cookies
import cookieParser from 'cookie-parser';

import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getApiInfo } from './utils/readApiInfo.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.get('/', async (req, res) => {
    const apiInfo = await getApiInfo();
    res.json({ apiInfo });
  });

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
