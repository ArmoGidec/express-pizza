const router = require('express').Router();

const pizzaRouter = require('./pizza.js');
const userRouter = require('./user.js');
const cartRouter = require('./cart.js');
const orderRouter = require('./order.js');

router.use('/pizza', pizzaRouter);
router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

module.exports = router;
