/**
 * @typedef {import('./Pizza')} Pizza
 */

/**
 * @typedef {import('mongodb').ObjectId} ObjectId
 */

class Cart {
    /**
     * @type {Map<ObjectId, Pizza}
     */
    _items = new Map();

    /**
     * @param {Pizza[]} items
     * @returns {Cart}
     */
    constructor(items = []) {
        this._items = items.map((item) => [item._id, item]);
    }

    /**
     * @param {Pizza} item
     * @returns {Cart}
     */
    add(item) {
        this._items.set(item._id, item);
        return this;
    }

    /**
     * @param {ObjectId} itemId
     * @returns {Cart}
     */
    remove(itemId) {
        this._items.delete(itemId);
        return this;
    }

    /**
     * @returns {Pizza[]}
     */
    getItems() {
        return [...this._items.values()];
    }
}

Cart.of = (cart = {}) => {
    return new Cart(cart._items);
};

module.exports = Cart;
