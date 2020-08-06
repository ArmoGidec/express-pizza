const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    pizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' }],
    data: {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: true,
        },
    },
    delivered: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
