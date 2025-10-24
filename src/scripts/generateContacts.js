import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const generateContacts = async (number) => {
  const prevContact = await readContacts();
  const contacts = Array(number).fill(0).map(createFakeContact);
  await writeContacts([...prevContact, ...contacts]);
};

generateContacts(2);
