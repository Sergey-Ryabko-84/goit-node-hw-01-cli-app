const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    console.table(JSON.parse(await fs.readFile(contactsPath)));
  } catch (err) {console.log(err)}
}

async function getContactById(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const contact = contacts.find(({ id }) => id === contactId);
    console.table(contact);
  } catch (err) {console.log(err)}
}

async function addContact(name, email, phone) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const newContact = {
      id: (contacts.length + 1).toString(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (err) {console.log(err)}
}

async function removeContact(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    if(!contacts.some(({id})=> id === contactId)) throw new Error(`No contact found with ID "${contactId}"`);
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (err) {console.log(err)}
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}