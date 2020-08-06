const router = require('express').Router();

const Order = require('../models/Order.js');

router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        req.session.cart = [];
        res.status(201).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
