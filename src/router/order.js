const router = require('express').Router();

const Order = require('../models/Order.js');
const authMiddleware = require('../middlewares/auth.js');

router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        const user = req.user;
        if (user) {
            user.orders = user.orders.concat(order.id);
            await user.save();
        }

        req.session.cart = [];
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({
            _id: {
                $in: req.user.orders,
            },
        }) || [];

        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
