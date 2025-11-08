// cloudinary — сервіс для зберігання, обробки та керування зображеннями й відео у хмарі
import cloudinary from 'cloudinary';

// node:fs/promises — асинхронна робота з файловою системою (читання, запис, видалення файлів)
import fs from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path, {
    folder: 'contacts_app',
    use_filename: true,
  });
  await fs.unlink(file.path);
  console.log(response);

  return response.secure_url;
};
