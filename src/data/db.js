const data = require('./data.json');

function getPizzas() {
    return JSON.parse(JSON.stringify(data.pizzas));
}

module.exports = { getPizzas };
