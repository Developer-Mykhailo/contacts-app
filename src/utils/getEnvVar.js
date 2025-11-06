// dotenv — завантажує змінні середовища з файлу .env у process.env (для зберігання конфіденційних налаштувань, наприклад JWT_SECRET, DB_URI тощо)
import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}
