// Импорт функций из модуля contacts.js
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

// Импорт необходимых модулей
const { Command } = require("commander"); // Модуль командной строки
const program = new Command(); // Создание экземпляра программы

// Определение опций командной строки
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv); // Разбор аргументов командной строки

const argv = program.opts(); // Получение опций командной строки

// Функция для вызова соответствующего действия
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await listContacts(); // Получение списка контактов
      console.table(list); // Вывод списка в виде таблицы
      break;

    case "get":
      const contact = await getContactById(id); // Получение контакта по идентификатору
      console.log(contact); // Вывод контакта
      break;

    case "add":
      const newContact = await addContact(name, email, phone); // Добавление нового контакта
      console.log(newContact); // Вывод нового контакта
      break;

    case "remove":
      const deleteContact = await removeContact(id); // Удаление контакта по идентификатору
      console.log(deleteContact); // Вывод удаленного контакта
      break;

    default:
      console.warn("\x1B[31m  Unknown action type!"); // Предупреждение о неизвестном типе действия
  }
};

invokeAction(argv); // Вызов функции для выполнения действия на основе опций командной строки
