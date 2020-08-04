const router = require('express').Router();

router.use((req, _, next) => {
    req.session.cart = req.session.cart || [];
    next();
});

router.get('/', (req, res) => {
    res.send(req.session.cart);
});

router.post('/set', (req, res) => {
    try {
        req.session.cart = req.body;
        res.send();
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
