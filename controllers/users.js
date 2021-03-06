const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: `Ошибка на сервере: ${err}` });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id })
      .orFail(new Error('NotValidId'));
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Неверные данные' });
      return;
    } if (err.message === 'NotValidId') {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.status(500).send({ message: `Ошибка на сервере: ${err}` });
    }
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    res.status(200).send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Неверные данные' });
      return;
    }
    res.status(500).send({ message: `Ошибка на сервере: ${err}` });
  }
};

const updateUser = async (req, res) => {
  const { name, about } = req.body;
  try {
    const userUpdate = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(new Error('NotValidId'));
    res.status(200).send(userUpdate);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Неверные данные' });
      return;
    }
    if (err.message === 'NotValidId') {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.status(500).send({ message: `Ошибка на сервере: ${err}` });
    }
  }
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const userUpdate = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(new Error('NotValidId'));
    res.status(200).send(userUpdate);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Неверные данные' });
      return;
    } if (err.message === 'NotValidId') {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.status(500).send({ message: `Ошибка на сервере: ${err}` });
    }
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
