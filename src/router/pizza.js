const router = require('express').Router();
const Pizza = require('../models/Pizza.js');

router.get('/', async (_, res) => {
    const pizzas = await Pizza.find();
    res.send(pizzas.map((pizza) => pizza.serialize()));
});

module.exports = router;
