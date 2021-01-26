const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '600ff43b3a6dbdbd3efb4bdb', // 600ff43b3a6dbdbd3efb4bdb изначальный id
  };
  next();
});

app.use(cards, users);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running ${PORT}`);
});
