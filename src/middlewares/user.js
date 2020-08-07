const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const user = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id: data._id, 'tokens.token': token });
        req.user = user;
        req.token = token;
    } catch {}

    next();
};

module.exports = user;
