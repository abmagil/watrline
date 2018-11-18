import { Reducer } from 'redux';
import { UpdateGoalAction } from '../../reducer';
import { GoalRecord } from '../../../../models/Goal';
import remainingAttr from '../../../../utils/remaining-attribute-name';

const goalReducer: Reducer<GoalRecord, UpdateGoalAction> = (state: GoalRecord, action: UpdateGoalAction) => {
  const { attrName: changingAttr, newVal} = action;
  const { lockedAttr } = state;
  const attrToCalculate = remainingAttr([lockedAttr, changingAttr]);

  if (!(changingAttr && attrToCalculate)) {
    console.log('Missing Information');
    return state;
  }

  return {
    ...state,
    [changingAttr]: newVal,
    // [attrToCalculate]: calculation({
    //   ...state,
    //   [changingAttr]: newVal,
    // }),
  };
};

export default goalReducer;
