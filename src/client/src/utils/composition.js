import groupby from 'lodash.groupby';
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @param { { [key in PropertyKey]: any } | any[] | string } obj
 * @return { boolean }
 */
export const isEmpty = obj => {
    if (obj === null || obj === undefined) return true;

    if (obj.length === 0) return true;
    else if (obj.length > 0) return false;

    if (typeof obj !== 'object') return true;

    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
};

/**
 * @param { string|number } value
 * @param { 'usd' | 'eur' } currency
 * @returns { string }
 */
export const toCurrency = (value, currency) => {
    try {
        if (typeof value !== 'number') {
            value = +value;
        }

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
            minimumFractionDigits: 0
        });

        return formatter.format(value);
    } catch (error) {
        return value;
    }
};

/**
 * @typedef { Object } Pizza
 * @property { string } id
 * @property { string } name
 * @property { string } description
 * @property { string } photoUrl
 * @property { Price } price
 * 
 * @typedef { Object } Price
 * @property { number } usd
 * @property { number } eur
 */

/**
 * @param { Pizza[] } cart
 * @returns { { count: number } & Pizza }
 */
export const formatCart = cart => {
    const cartGroups = groupby(cart, 'id');
    return Object.entries(cartGroups).map(([, group]) => ({
        ...group[0],
        count: group.length
    }));
};
