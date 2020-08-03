const router = require('express').Router();
const db = require('../data/db.js');

router.get('/', (_, res) => {
    /**
     * @type {import('../models/Cart.js').Pizza[]}
     */
    const pizzas = db.getPizzas();
    res.json(pizzas);
});

module.exports = router;
