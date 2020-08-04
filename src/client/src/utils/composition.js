const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @param { { [key in PropertyKey]: any } } obj
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

export const toCurrency = value => {
    try {
        if (typeof value !== 'number') {
            value = +value;
        }

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });

        return formatter.format(value);
    } catch (error) {
        return value;
    }
}
