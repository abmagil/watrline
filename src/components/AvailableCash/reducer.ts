import { Reducer } from 'redux';
import * as _ from 'lodash';
const { sum, orderBy } = _;

import { StoreShape } from '../../store';

export interface UpdateCashAction {
  type: 'APP:UPDATE_CASH';
  availableCash: number;
}

type AvailableCashState = number;
const reducer: Reducer<AvailableCashState, UpdateCashAction> = (state = 0, action: UpdateCashAction) => {
  const { availableCash } = action;
  switch (action.type) {
  case 'APP:UPDATE_CASH':
    return availableCash;
  default:
    return state;
  }
};

export const setAvailableCash = (newCash: number) => ({
  type: 'APP:UPDATE_CASH',
  availableCash: newCash,
})

export const orderedGoalsFrom = (state: StoreShape) => (
  state.order.map((goalId: string) => (state.goals[goalId])) || []
);

export const totalGoalSpendingFrom = (state: StoreShape) => {
  const objectValues = Object.keys(state.goals).map((key) => state.goals[key]);
  return sum(objectValues.map((goal) => (goal.spendingPerMonth)));
};

export const completionOrderedGoalsFrom = (state: StoreShape) => {
  return orderBy(state.goals, ['deadlineYear', 'spendingPerMonth']);
};


export default reducer;
