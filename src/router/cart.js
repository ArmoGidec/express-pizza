const router = require('express').Router();
const Cart = require('../models/Cart.js');

router.use((req, _, next) => {
    req.session.cart = Cart.of(req.session.cart);
    next();
});

router.get('/', (req, res) => {
    /**
     * @type {import('../models/Cart.js')}
     */
    const cart = req.session.cart;
    res.send(cart.getItems());
});

router.post('/set', (req, res) => {
    try {
        req.session.cart = new Cart(req.body);
        res.send();
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
