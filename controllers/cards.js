const path = require('path');
const readFiles = require('../utils/read-file.js');

const jsonDataPathToCards = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => readFiles(jsonDataPathToCards)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({ message: `Ошибка на сервере ${err}` });
  });

module.exports = { getCards };
