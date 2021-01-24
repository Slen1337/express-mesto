const path = require('path');
const readFiles = require('../utils/read-file.js');

const jsonDataPathToUsers = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => readFiles(jsonDataPathToUsers)
  .then((data) => res.send(data))
  .catch((err) => {
    res.status(500).send({ message: `Ошибка на сервере ${err}` });
  });

const getUser = (req, res) => readFiles(jsonDataPathToUsers)
  .then((data) => data.find((user) => user._id === req.params.id))
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.send(user);
  })
  .catch((err) => {
    res.status(500).send({ message: `Ошибка на сервере ${err}` });
  });

module.exports = {
  getUsers,
  getUser,
};
