const isNumber = (value) => {
    value = value === null ? NaN : +value;
    return typeof value === 'number' && !isNaN(value);
};

const isInteger = (value) => isFinite(value) && value === Math.round(value);

const quantityExponent = (val) => {
    if (val === 0) {
        return 0;
    }
    let exp = Math.floor(Math.log(val) / Math.LN10);
    // Fix precision loss.
    if (val / Math.pow(10, exp) >= 10) {
        exp++;
    }
    return exp;
};

export { isNumber, isInteger, quantityExponent };
