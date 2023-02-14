const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
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
      data = await listContacts();
      console.table(JSON.parse(data));
      break;

    case "get":
      contact = await getContactById(id);
      console.table([contact]);
      break;

    case "add":
      newContact = await addContact(name, email, phone);
      console.table([newContact]);
      break;

    case "remove":
      contact = await removeContact(id);
      console.table(contact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
