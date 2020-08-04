const router = require('express').Router();
const pizzaRouter = require('./pizza.js');
const userRouter = require('./user.js');

router.use('/pizza', pizzaRouter);
router.use('/user', userRouter);

module.exports = router;
