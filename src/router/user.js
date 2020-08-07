const User = require('../models/User');
const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.js');

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            user,
            token,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password).catch(() => {});
        if (!user) {
            return res.status(401).send({ error: 'Invalid login/password' });
        }
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/me', authMiddleware, (req, res) => {
    try {
        res.send({
            user: req.user,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.all('/logout', authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = user.tokens.filter(({ token }) => token !== req.token);
        await user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
