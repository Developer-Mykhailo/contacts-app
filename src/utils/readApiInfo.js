import path from 'node:path';
import fs from 'node:fs/promises';

const PATH_TO_API_INFO = path.join(process.cwd(), 'src/docs/api-info.json');

export const getApiInfo = async (req, res) => {
  try {
    const data = await fs.readFile(PATH_TO_API_INFO, 'utf8');

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};
