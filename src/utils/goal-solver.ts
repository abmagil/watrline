import {pickBy} from 'lodash';
import { GoalData, GoalMissingTotal, GoalMissingDeadline, GoalMissingSpendingPerMonth, GoalBase } from '../models/Goal';
import remainingAttr from './remaining-attribute-name';
import * as calculated from './attr-relationships';

type FailureToSolveHandler = <T extends GoalBase>(incompleteGoal: Partial<T>) => void;
// Takes in a partial of our Goal types, returns a completed one or errors
type GoalRowSolverFn = <T extends GoalBase>(goal: Partial<T>) => T | ReturnType<FailureToSolveHandler>;

const defaultCallback = (incalculableGoalData: any) => {
  throw new Error(`Too many unset attributes for goal ${incalculableGoalData.type}`);
}

/**
 * Returns a function which takes a sparse goal, missing one or more calculable elements, and solves 
 * for the missing element, if possible.
 * @param fnForIncalculableGoal Function to run if passed goal is too sparse and cannot be solved
 */
const solverFactory = (fnForIncalculableGoal: FailureToSolveHandler = defaultCallback): GoalRowSolverFn => {
  return <T extends GoalBase>(partialGoal: Partial<T>): T|any => {
    // const partialGoal = goalDataWithEnteredValues(partialGoal);
    const setAttributes = Object.keys(pickBy(partialGoal as GoalBase, (str) => (str && str !== ''))) as Array<LockableAttrName>;
    const unsetAttribute =  remainingAttr(setAttributes);

    if (unsetAttribute.length > 1) {
      return fnForIncalculableGoal(partialGoal);
    }
    
    if (unsetAttribute.length === 0) {
      // In the base case, no attribute is missing
      return partialGoal as T;
    }

    const missingAttrName = unsetAttribute[0];
    if(isMissingTotal(partialGoal, missingAttrName)) {
      return {
        ...partialGoal,
        goalTotal: calculated.total(partialGoal),
      };
    }
    
    if (isMissingDeadline(partialGoal, missingAttrName)) {
      return {
        ...partialGoal,
        deadlineYear: calculated.endYear(partialGoal),
      };
    }
    
    if (isMissingMonthlySpending(partialGoal, missingAttrName)) {
      return {
        ...partialGoal,
        spendingPerMonth: calculated.spendingPerMonthFn(partialGoal),
      }
    }
  };
}

// TODO this function should be better
// function goalDataWithEnteredValues<T extends GoalBase>(partialGoal: T): Partial<T> {
//   const enteredValues = (pickBy(partialGoal, (str) => (str !== ''))) as Partial<Stringified<T>>;
//   return mapValues(enteredValues, Number);
// }

function isMissingTotal(goal: Partial<GoalBase>, unsetAttribute: LockableAttrName): goal is GoalMissingTotal {
  return unsetAttribute === 'goalTotal';
}

function isMissingDeadline(goal: Partial<GoalBase>, unsetAttribute: LockableAttrName): goal is GoalMissingDeadline {
  return unsetAttribute === 'deadlineYear';
}

function isMissingMonthlySpending(goal: Partial<GoalData>, unsetAttribute: LockableAttrName): goal is GoalMissingSpendingPerMonth {
  return unsetAttribute === 'spendingPerMonth';
}

export default solverFactory;
