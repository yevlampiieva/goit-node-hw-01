const { Command } = require("commander");

const { listContacts, getContactById, removeContact, addContact } = require("./contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "Choose action")
  .option("-i, --id <type>", "User id")
  .option("-n, --name <type>", "User name")
  .option("-e, --email <type>", "User email")
  .option("-p, --phone <type>", "User phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
