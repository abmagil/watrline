import {without, isFinite, isString, pickBy} from 'lodash';
import * as calculated from '../utils/attr-relationships';

const functionMap = {
  goalTotal: calculated.total,
  deadlineYear: calculated.endYear,
  spendingPerMonth: calculated.spendingPerMonth,
};

const valueIsEntered = (value) => (
  isString(value) && value.length > 0 ||
  isFinite(value) && value > 0
);

export const COUPLED_ATTRIBUTES = [
  'goalTotal',
  'deadlineYear',
  'spendingPerMonth',
];

export default function (incalculableFn) {
  return function (partialGoal) {
    let nextGoal = pickBy(partialGoal, valueIsEntered);
    const unsetAttribute = without(COUPLED_ATTRIBUTES, ...Object.keys(nextGoal));

    if (unsetAttribute.length > 1) {
      return incalculableFn(partialGoal);
    } else if (unsetAttribute.length === 1) {
      const attrToCalculate = unsetAttribute[0];
      const calculation = functionMap[attrToCalculate];

      nextGoal = {
        ...nextGoal,
        [attrToCalculate]: calculation(nextGoal),
      };
    }
    return nextGoal;
  };
}
