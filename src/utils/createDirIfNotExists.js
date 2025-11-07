// node:fs/promises — асинхронна робота з файловою системою (читання, запис, видалення файлів)
import fs from 'node:fs/promises';

export const createDirIfNotExists = async (url) => {
  try {
    await fs.access(url);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};
