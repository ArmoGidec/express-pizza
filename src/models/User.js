const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pick = require('lodash.pick');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid address');
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate: (value) => {
            if (value.length < 6) {
                throw new Error('Too short');
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = bcrypt.hashSync(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid login credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }

    return user;
};

userSchema.methods.serialize = function () {
    return pick(this, ['email']);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
