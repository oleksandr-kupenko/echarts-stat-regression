/**
 * Get the size of a array
 * @param  {Array} data
 * @return {Array}
 */
export function size(data) {
    const s = [];
    while (isArray(data)) {
        s.push(data.length);
        data = data[0];
    }
    return s;
}

/**
 * @param {*}  value
 * @return {boolean}
 */
export function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * Constructs a (m x n) array with all values 0
 * @param  {number} m  the row
 * @param  {number} n  the column
 * @return {Array}
 */
export function zeros(m, n) {
    const zeroArray = [];
    for (let i = 0; i < m; i++) {
        zeroArray[i] = [];
        for (let j = 0; j < n; j++) {
            zeroArray[i][j] = 0;
        }
    }
    return zeroArray;
}

/**
 * Sums each element in the array.
 * Internal use, for performance considerations, to avoid
 * unnecessary judgments and calculations.
 * @param  {Array} vector
 * @return {number}
 */
export function sum(vector) {
    let sum = 0;
    for (let i = 0; i < vector.length; i++) {
        sum += vector[i];
    }
    return sum;
}

/**
 * Computes the sum of the specified column elements in a two-dimensional array
 * @param  {Array.<Array>} dataList  two-dimensional array
 * @param  {number} n  the specified column, zero-based
 * @return {number}
 */
export function sumOfColumn(dataList, n) {
    let sum = 0;
    for (let i = 0; i < dataList.length; i++) {
        sum += dataList[i][n];
    }
    return sum;
}

export function ascending(a, b) {
    return a > b ? 1 : a < b ? -1 : a === b ? 0 : NaN;
}

/**
 * Binary search algorithm --- this bisector is specified to histogram, which every bin like that [a, b),
 * so the return value use to add 1.
 * @param  {Array.<number>} array
 * @param  {number} value
 * @param  {number} start
 * @param  {number} end
 * @return {number}
 */
export function bisect(array, value, start, end) {
    if (start == null) {
        start = 0;
    }
    if (end == null) {
        end = array.length;
    }
    while (start < end) {
        const mid = Math.floor((start + end) / 2);
        const compare = ascending(array[mid], value);
        if (compare > 0) {
            end = mid;
        } else if (compare < 0) {
            start = mid + 1;
        } else {
            return mid + 1;
        }
    }
    return start;
}

/**
 * 数组映射
 * @param {Array} obj
 * @param {Function} cb
 * @param {*} [context]
 * @return {Array}
 */
export function map(obj, cb, context) {
    if (!(obj && cb)) {
        return;
    }
    if (obj.map && obj.map === Array.prototype.map) {
        return obj.map(cb, context);
    } else {
        const result = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            result.push(cb.call(context, obj[i], i, obj));
        }
        return result;
    }
}
