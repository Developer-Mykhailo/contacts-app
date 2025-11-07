// node:path — робота з файловими шляхами (створення абсолютних, відносних шляхів тощо)
import path from 'node:path';

// node:fs/promises — асинхронна робота з файловою системою (читання, запис, видалення файлів)
import fs from 'node:fs/promises';

import { APP_DOMAIN, TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${getEnvVar(APP_DOMAIN)}/uploads/${file.filename}`;
};
