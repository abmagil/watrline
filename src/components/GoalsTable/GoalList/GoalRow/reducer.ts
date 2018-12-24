import { omit, includes } from 'lodash';
import { Reducer } from 'redux';
import { UpdateGoalAction } from '../../reducer';
import { GoalRecord, LockableAttributes } from '../../../../models/Goal';
import remainingAttr from '../../../../utils/remaining-attribute-name';
import goalSolver from '../../../../utils/goal-solver';

const errorCallback = () => {
  console.log('ERROR: Attempting to solve incomplete Goal');
};

const partialToCompleteGoal = goalSolver(errorCallback);

const goalReducer: Reducer<GoalRecord, UpdateGoalAction> = (goal, action: UpdateGoalAction) => {
  if (!goal) { throw new Error("Goal Reducer called without a goal") }
  
  const { attrName: changingAttr} = action;
  const { lockedAttr } = goal;
  const attrToCalculate = remainingAttr([lockedAttr, changingAttr])[0];
  
  if (includes(LockableAttributes, attrToCalculate)) {
    return <GoalRecord>partialToCompleteGoal(omit(goal, attrToCalculate));
  }

  throw new Error('oopsy doodle');
};

export default goalReducer;
