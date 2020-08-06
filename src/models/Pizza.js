const mongoose = require('mongoose');
const pick = require('lodash.pick');

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        usd: {
            type: Number,
            required: true,
        },
        eur: {
            type: Number,
            required: true,
        },
    },
    photoUrl: {
        type: String,
        required: true,
    },
});

pizzaSchema.methods.serialize = function() {
    return pick(this, ['name', 'description', 'price', 'photoUrl', 'id']);
}

const Pizza = mongoose.model('Pizza', pizzaSchema);
module.exports = Pizza;
