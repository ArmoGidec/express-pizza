/**
 * @typedef {Object} Price
 * @property {number} usd
 * @property {number} eur
 */

/**
 * @typedef {Object} Pizza
 * @prop {number}  id;
 * @prop {string}  name;
 * @prop {string}  description;
 * @prop {Price}  price;
 */

class Cart {
    /**
     * @type {Map<number, Pizza}
     */
    _items = new Map();

    /**
     * @param {Pizza[]} items
     * @returns {Cart}
     */
    constructor(items = []) {
        this._items = items.map((item) => [item.id, item]);
    }

    /**
     * @param {Pizza} item
     * @returns {Cart}
     */
    add(item) {
        this._items.set(item.id, item);
        return this;
    }

    /**
     * @param {number} itemId
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

module.exports = Cart;
