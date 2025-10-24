import { readContacts } from '../utils/readContacts.js';

export const countContacts = async () => {
  const data = await readContacts();
  return data.length;
};

console.log(await countContacts());
