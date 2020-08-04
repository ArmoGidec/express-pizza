const router = require('express').Router();
const db = require('../data/db.js');
const usersRouter = require('./users.js');

router.get('/', (_, res) => {
    /**
     * @type {import('../models/Cart.js').Pizza[]}
     */
    const pizzas = db.getPizzas();
    res.json(pizzas);
});

router.use('/users', usersRouter);

module.exports = router;
