const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    return await fs.readFile(contactsPath);
  } catch (err) {console.log(err)}
}

async function getContactById(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    if (!contacts.some(({ id }) => id === contactId))
      throw new Error(`No contact found with ID "${contactId}"`);
    const contact = contacts.find(({ id }) => id === contactId);
    return contact;
  } catch (err) {console.log(err)}
}

async function addContact(name, email, phone) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const newContact = {
      id: (Number(contacts[contacts.length - 1].id) + 1).toString(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {console.log(err)}
}

async function removeContact(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    if (!contacts.some(({ id }) => id === contactId))
      throw new Error(`No contact found with ID "${contactId}"`);
    const index = contacts.findIndex(({ id }) => id === contactId)
    const contact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (err) {console.log(err)}
}

async function updateContact(contactId, name, email, phone) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const newContactData = {};
    if (name) newContactData.name = name;
    if (email) newContactData.email = email;
    if (phone) newContactData.phone = phone;
    const index = contacts.findIndex(({ id }) => id === contactId);
    const changedContact = {
      ...contacts[index],
      ...newContactData
    };
    contacts.splice(index, 1, changedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return changedContact;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};