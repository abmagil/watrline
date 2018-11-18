import { Reducer } from 'redux';
import { GoalRecord } from '../../models/Goal';

export interface AddGoalAction {
  type: 'GOAL:ADD';
  goal: GoalRecord;
}

export interface MoveGoalUpAction {
  type: 'GOAL:MOVE_UP';
  id: string;
}

export interface MoveGoalDownAction {
  type: 'GOAL:MOVE_DOWN';
  id: string;
}

export const moveUp = (id: string): MoveGoalUpAction => ({ type: 'GOAL:MOVE_UP', id});
export const moveDown = (id: string): MoveGoalDownAction => ({ type: 'GOAL:MOVE_DOWN', id});

type OrderAction = AddGoalAction | MoveGoalUpAction | MoveGoalDownAction
const reducer: Reducer<Array<string>, OrderAction> = (state = [], action): Array<string> => {
  switch (action.type) {
  case 'GOAL:ADD': {
    return [
      action.goal.id,
      ...state,
    ];
  }
  case 'GOAL:MOVE_UP': {
    const goalIdx: number = state.indexOf(action.id);
    if (goalIdx <= 0) { // guard both non-existent element and first element
      return state;
    }
    const prevEl = state[goalIdx - 1];
    return [
      ...state.slice(0, goalIdx - 1),
      state[goalIdx],
      prevEl,
      ...state.slice(goalIdx + 1),
    ];
  }
  case 'GOAL:MOVE_DOWN': {
    const goalIdx: number = state.indexOf(action.id);
    if ((goalIdx < 0) || (goalIdx === state.length - 1)) {
      return state;
    }
    return [
      ...state.slice(0,goalIdx),
      state[goalIdx + 1],
      state[goalIdx],
      ...state.slice(goalIdx + 2),
    ];
  }
  default:
    return state;
  }
}

export default reducer;
