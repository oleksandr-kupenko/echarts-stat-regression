import * as array from './array';
import * as number from './number';

/**
 * @param  {Array.<number>|number} dimensions like `[2, 4]` or `4`
 * @param  {Array.<number>} [defaultDimensions=undefined] By default `undefined`.
 * @return {Array.<number>} number like `4` is normalized to `[4]`,
 *         `null`/`undefined` is normalized to `defaultDimensions`.
 */
export function normalizeDimensions(dimensions, defaultDimensions) {
    return typeof dimensions === 'number'
        ? [dimensions]
        : dimensions == null
            ? defaultDimensions
            : dimensions;
}

/**
 * Data preprocessing, filter the wrong data object.
 *  for example [12,] --- missing y value
 *              [,12] --- missing x value
 *              [12, b] --- incorrect y value
 *              ['a', 12] --- incorrect x value
 * @param  {Array.<Array>} data
 * @param  {Object?} [opt]
 * @param  {Array.<number>} [opt.dimensions] Optional. Like [2, 4],
 *         means that dimension index 2 and dimension index 4 need to be number.
 *         If null/undefined (by default), all dimensions need to be number.
 * @param  {boolean} [opt.toOneDimensionArray] Convert to one dimension array.
 *         Each value is from `opt.dimensions[0]` or dimension 0.
 * @return {Array.<Array.<number>>}
 */
export function dataPreprocess(data, opt) {
    opt = opt || {};
    const dimensions = opt.dimensions;
    const numberDimensionMap = {};
    if (dimensions != null) {
        for (let i = 0; i < dimensions.length; i++) {
            numberDimensionMap[dimensions[i]] = true;
        }
    }
    const targetOneDim = opt.toOneDimensionArray
        ? (dimensions ? dimensions[0] : 0)
        : null;

    function shouldBeNumberDimension(dimIdx) {
        return !dimensions || numberDimensionMap.hasOwnProperty(dimIdx);
    }

    if (!array.isArray(data)) {
        throw new Error('Invalid data type, you should input an array');
    }
    const predata = [];
    const arraySize = array.size(data);

    if (arraySize.length === 1) {
        for (let i = 0; i < arraySize[0]; i++) {
            const item = data[i];
            if (number.isNumber(item)) {
                predata.push(item);
            }
        }
    }
    else if (arraySize.length === 2) {
        for (let i = 0; i < arraySize[0]; i++) {
            let isCorrect = true;
            const item = data[i];
            for (let j = 0; j < arraySize[1]; j++) {
                if (shouldBeNumberDimension(j) && !number.isNumber(item[j])) {
                    isCorrect = false;
                }
            }
            if (isCorrect) {
                predata.push(
                    targetOneDim != null
                        ? item[targetOneDim]
                        : item
                );
            }
        }
    }
    return predata;
}

/**
 * @param {string|number} val
 * @return {number}
 */
export function getPrecision(val) {
    const str = val.toString();
    // scientific notation is not considered
    const dotIndex = str.indexOf('.');
    return dotIndex < 0 ? 0 : str.length - 1 - dotIndex;
}
