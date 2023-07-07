// Импорт необходимых модулей
const fs = require("fs/promises"); // Модуль файловой системы для работы с файлами
const path = require("path"); // Модуль пути для работы с путями файлов
const { nanoid } = require("nanoid"); // Модуль Nanoid для генерации уникальных идентификаторов

// Путь к файлу contacts.json
const contactsPath = path.join(__dirname, "./db/contacts.json");

// Функция для чтения файла контактов
const readContactsFile = async () => {
  try {
    // Чтение файла контактов
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data); // Разбор JSON данных и их возврат
  } catch (error) {
    console.error("Ошибка при чтении файла контактов:", error); // Логирование сообщения об ошибке при чтении
    return null;
  }
};

// Функция для записи данных в файл контактов
const writeContactsFile = async (data) => {
  try {
    // Запись данных в файл контактов
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Ошибка при записи файла контактов:", error); // Логирование сообщения об ошибке при записи
  }
};

// Функция для получения списка всех контактов
const listContacts = async () => {
  const data = await readContactsFile(); // Чтение файла контактов
  return data; // Возврат данных
};

// Функция для получения контакта по идентификатору
const getContactById = async (contactId) => {
  const data = await listContacts(); // Получение списка всех контактов
  const res = data.find(({ id }) => id === contactId); // Поиск контакта с указанным идентификатором
  return res; // Возврат найденного контакта
};

// Функция для удаления контакта по идентификатору
const removeContact = async (contactId) => {
  const data = await listContacts(); // Получение списка всех контактов
  const index = data.findIndex(({ id }) => id === contactId); // Поиск индекса контакта с указанным идентификатором
  if (index === -1) {
    throw new Error("Контакт не найден"); // Генерация ошибки, если контакт не найден
  }
  const deleteContact = data[index];
  data.splice(index, 1);
  await writeContactsFile(data);
  return deleteContact;
};

// Функция для добавления контакта
const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    throw new Error("Имя, email и телефон обязательны"); // Генерация ошибки, если не указано имя, email или телефон
  }
  const data = await listContacts(); // Получение списка всех контактов
  const id = nanoid(); // Генерация уникального идентификатора
  const newContact = {
    name,
    email,
    phone,
    id,
  };
  data.push(newContact);
  await writeContactsFile(data);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
