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

module.exports = router;
