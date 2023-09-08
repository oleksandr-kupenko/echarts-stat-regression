import * as regressionBase from './dist/helpers/regression-base';
import * as transformHelper from './dist/helpers/helper';

const FORMULA_DIMENSION = 2;

export const ecStatRegression: { type: string; transform: (params: any) => { dimensions: any; data: any; }[]; } = {

  type: 'ecStat:regression',

  transform: function transform(params) {
    const upstream = params.upstream;
    const config = params.config || {};
    const method = config.method || 'linear';

    const result = regressionBase.default(method, upstream.cloneRawData(), {
      order: config.order,
      dimensions: transformHelper.normalizeExistingDimensions(params, config.dimensions)
    });
    const points = result.points;

    let formulaOn = config.formulaOn;
    if (formulaOn == null) {
      formulaOn = 'end';
    }

    let dimensions;
    if (formulaOn !== 'none') {
      for (let i = 0; i < points.length; i++) {
        points[i][FORMULA_DIMENSION] =
            (
                (formulaOn === 'start' && i === 0)
                || (formulaOn === 'all')
                || (formulaOn === 'end' && i === points.length - 1)
            ) ? result.expression : '';
      }
      dimensions = upstream.cloneAllDimensionInfo();
      dimensions[FORMULA_DIMENSION] = {};
    }

    return [{
      dimensions: dimensions,
      data: points
    }];
  }
};

export default ecStatRegression;
