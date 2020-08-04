const mongoose = require('mongoose');
const { default: validator } = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid email address' });
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
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
        throw new Error({ error: 'Invalid login credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }

    return user;
};

userSchema.methods.serialize = function() {
    const user = this;
    return {
        name: user.name,
        email: user.email
    };
}

const User = mongoose.model('User', userSchema);
module.exports = User;
