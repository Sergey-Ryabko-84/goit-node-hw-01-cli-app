const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContact = await listContacts();
      console.table(JSON.parse(allContact));
      break;

    case "get":
      const contact = await getContactById(id);
      console.table([contact]);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.table([newContact]);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      console.table(deleteContact);
      break;

    case "update":
      const changedContact = await updateContact(id, name, email, phone);
      console.table(changedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
