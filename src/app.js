require('./db/db.js');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const userMiddleware = require('./middlewares/user.js');
const router = require('./router');

const SECRET = process.env.SECRET;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: SECRET,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
        },
        resave: true,
        saveUninitialized: true
    })
);

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(userMiddleware);

app.use('/api', router);

module.exports = app;
