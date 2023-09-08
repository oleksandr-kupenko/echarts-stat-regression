import { dataPreprocess, normalizeDimensions } from './dataProcess';

const regreMethods = {

    /**
     * Common linear regression algorithm
     */
    linear: function (predata, opt) {

        const xDimIdx = opt.dimensions[0];
        const yDimIdx = opt.dimensions[1];
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumXX = 0;
        const len = predata.length;

        for (let i = 0; i < len; i++) {
            const rawItem = predata[i];
            sumX += rawItem[xDimIdx];
            sumY += rawItem[yDimIdx];
            sumXY += rawItem[xDimIdx] * rawItem[yDimIdx];
            sumXX += rawItem[xDimIdx] * rawItem[xDimIdx];
        }

        const gradient = ((len * sumXY) - (sumX * sumY)) / ((len * sumXX) - (sumX * sumX));
        const intercept = (sumY / len) - ((gradient * sumX) / len);

        const result = [];
        for (let j = 0; j < predata.length; j++) {
            const rawItem = predata[j];
            const resultItem = rawItem.slice();
            resultItem[xDimIdx] = rawItem[xDimIdx];
            resultItem[yDimIdx] = gradient * rawItem[xDimIdx] + intercept;
            result.push(resultItem);
        }

        const expression = 'y = ' + Math.round(gradient * 100) / 100 + 'x + ' + Math.round(intercept * 100) / 100;

        return {
            points: result,
            parameter: {
                gradient: gradient,
                intercept: intercept
            },
            expression: expression
        };
    },

    // ... Остальные методы остаются без изменений ...
};

/**
 * Gaussian elimination
 * @param  {Array.<Array.<number>>} matrix   two-dimensional number array
 * @param  {number} number
 * @return {Array}
 */
function gaussianElimination(matrix, number) {
    // ... Код для gaussianElimination остается без изменений ...
}

/**
 * @param  {string} regreMethod
 * @param  {Array.<Array.<number>>} data   two-dimensional number array
 * @param  {Object|number} [optOrOrder]  opt or order
 * @param  {number} [optOrOrder.order]  order of polynomials
 * @param  {Array.<number>|number} [optOrOrder.dimensions=[0, 1]]  Target dimensions to calculate the regression.
 *         By defualt: use [0, 1] as [x, y].
 * @return {Array}
 */
const regressionBase = function (regreMethod, data, optOrOrder) {
    const opt = typeof optOrOrder === 'number'
        ? { order: optOrOrder }
        : (optOrOrder || {});

    const dimensions = normalizeDimensions(opt.dimensions, [0, 1]);

    const predata = dataPreprocess(data, { dimensions: dimensions });
    const result = regreMethods[regreMethod](predata, {
        order: opt.order,
        dimensions: dimensions
    });

    // Sort for line chart.
    const xDimIdx = dimensions[0];
    result.points.sort(function (itemA, itemB) {
        return itemA[xDimIdx] - itemB[xDimIdx];
    });

    return result;
};

export default regressionBase;
