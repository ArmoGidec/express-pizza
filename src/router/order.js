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
        res.status(201).send(await order.execPopulate('pizzas'));
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const orders =
            (await Order.find({
                _id: {
                    $in: req.user.orders,
                },
            }).populate('pizzas')) || [];

        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/:orderId/mark', authMiddleware, async (req, res) => {
    try {
        const orderId = req.params.orderId;
        if (!req.user.orders.every((order) => order.id !== orderId)) {
            throw { error: 'Invalid order id' };
        }

        const order = await Order.findById(orderId);
        order.delivered = true;
        await order.save();

        res.send(await order.execPopulate('pizzas'));
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
