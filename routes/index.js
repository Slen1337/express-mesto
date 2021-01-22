const router = require('express').Router();

const userRoutes = require('./users.js');
const cardsRoutes = require('./cards.js');
const errorsRoutes = require('./errors.js');

router.use('/', cardsRoutes);
router.use('/', userRoutes);
router.use('/', errorsRoutes);

module.exports = router;
