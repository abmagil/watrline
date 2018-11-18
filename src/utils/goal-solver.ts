import {pickBy, mapValues} from 'lodash';
import { GoalData, GoalMissingTotal, GoalMissingDeadline, GoalMissingSpendingPerMonth } from '../models/Goal';
import remainingAttr from './remaining-attribute-name';
import * as calculated from './attr-relationships';
import { GoalRowType } from '../components/GoalsTable/GoalList/GoalRow/component';

type FailureToSolveHandler = (incompleteGoal: Partial<GoalData|GoalRowType>) => any;

const defaultCallback = (incalculableGoalData: any) => {
  throw new Error(`Too many unset attributes for goal ${incalculableGoalData.type}`);
}

/**
 * Returns a function which takes a sparse goal, missing one or more calculable elements, and solves 
 * for the missing element, if possible.
 * @param fnForIncalculableGoal Function to run if passed goal is too sparse and cannot be solved
 */
const solverFactory = (fnForIncalculableGoal: FailureToSolveHandler = defaultCallback): GoalData | ReturnType<FailureToSolveHandler> => {
  return (partialGoal: GoalRowType): GoalData|any => {
    const nextGoal = goalDataWithEnteredValues(partialGoal);
    const setAttributes = Object.keys(nextGoal) as Array<LockableAttrName>; // pickBy(partialGoal, (str) => (str !== ''));
    const unsetAttribute =  remainingAttr(setAttributes);

    if (unsetAttribute.length > 1) {
      return fnForIncalculableGoal(partialGoal);
    }
    
    if (unsetAttribute.length === 0) {
      // In the base case, no attribute is missing
      return nextGoal as GoalData;
    }

    const missingAttrName = unsetAttribute[0];
    if(isMissingTotal(nextGoal, missingAttrName)) {
      return {
        ...nextGoal,
        goalTotal: calculated.total(nextGoal),
      };
    }
    
    if (isMissingDeadline(nextGoal, missingAttrName)) {
      return {
        ...nextGoal,
        deadlineYear: calculated.endYear(nextGoal),
      };
    }
    
    if (isMissingMonthlySpending(nextGoal, missingAttrName)) {
      return {
        ...nextGoal,
        spendingPerMonth: calculated.spendingPerMonthFn(nextGoal),
      }
    }
  };
}

function goalDataWithEnteredValues(partialGoal: Stringified<GoalRowType>): Partial<GoalData> {
  const enteredValues = pickBy(partialGoal, (str) => (str !== ''));
  return mapValues(enteredValues, Number);
}

function isMissingTotal(goal: Partial<GoalData>, unsetAttribute: LockableAttrName): goal is GoalMissingTotal {
  return unsetAttribute === 'goalTotal';
}

function isMissingDeadline(goal: Partial<GoalData>, unsetAttribute: LockableAttrName): goal is GoalMissingDeadline {
  return unsetAttribute === 'deadlineYear';
}

function isMissingMonthlySpending(goal: Partial<GoalData>, unsetAttribute: LockableAttrName): goal is GoalMissingSpendingPerMonth {
  return unsetAttribute === 'spendingPerMonth';
}

export default solverFactory;
