import {without, isFinite, isString, pickBy} from 'lodash';
import * as calculated from './attr-relationships';

const functionMap = {
  goalTotal: calculated.total,
  deadlineYear: calculated.endYear,
  spendingPerMonth: calculated.spendingPerMonthFn,
};

const valueIsEntered = (value: number|string): boolean => (
  (isString(value) && value.length > 0) ||
  (isFinite(value) && value > 0)
);

export const COUPLED_ATTRIBUTES = [
  'goalTotal',
  'deadlineYear',
  'spendingPerMonth',
];

export default function (incalculableFn: (incompleteGoal: Partial<GoalData>) => any) {
  return (partialGoal: GoalData|CalculableGoalData|IncalculableGoalData): GoalData|any => {
    let nextGoal = goalDataWithEnteredValues(partialGoal);
    const unsetAttribute = without(COUPLED_ATTRIBUTES, ...Object.keys(nextGoal));

    // We cannot solve for this goal's missing information- too much is missing
    if (unsetAttribute.length > 1) {
      return incalculableFn(partialGoal);
    // We can solve for this information
    } else if (unsetAttribute.length === 1) {
      const attrToCalculate = unsetAttribute[0];
      const calculation = functionMap[attrToCalculate];

      nextGoal = {
        ...nextGoal,
        [attrToCalculate]: calculation(nextGoal),
      } as CalculableGoalData;
    }

    // In the base case, no attribute is missing
    return nextGoal as GoalData;
  };
}

function goalDataWithEnteredValues(partialGoal: GoalData|CalculableGoalData|IncalculableGoalData): CalculableGoalData|IncalculableGoalData {
  return pickBy(partialGoal, valueIsEntered) as GoalData|CalculableGoalData|IncalculableGoalData;
}
