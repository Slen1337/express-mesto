const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const Cards = await Card.find({});
    res.status(200).send(Cards);
  } catch (err) {
    res.status(500).send({ message: `Ошибка на сервере: ${err}` });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const cardCreate = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(cardCreate);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Неверные данные' });
      return;
    }
    res.status(500).send({ message: `Ошибка на сервере: ${err}` });
  }
};

const deleteCard = async (req, res) => {
  try {
    const cardDelete = await Card.findByIdAndRemove({ _id: req.params.cardId })
      .orFail(new Error('NotValidId'));
    res.status(200).send({ message: `Карточку удалили ${cardDelete}` });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Неверные данные' });
      return;
    } if (err.message === 'NotValidId') {
      res.status(404).send({ message: 'Карточка не найдена' });
    } else {
      res.status(500).send({ message: `Ошибка на сервере: ${err}` });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const cardLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new Error('NotValidId')); // Добавлен способ orFail, спасибо за проделанную работу!
    res.status(200).send(cardLike);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Неверные данные' });
      return;
    } if (err.message === 'NotValidId') {
      res.status(404).send({ message: 'Карточка не найдена' });
    } else {
      res.status(500).send({ message: `Ошибка на сервере: ${err}` });
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const cardDislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(new Error('NotValidId'));
    res.status(200).send(cardDislike);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Неверные данные' });
      return;
    } if (err.message === 'NotValidId') {
      res.status(404).send({ message: 'Карточка не найдена' });
    } else {
      res.status(500).send({ message: `Ошибка на сервере: ${err}` });
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
