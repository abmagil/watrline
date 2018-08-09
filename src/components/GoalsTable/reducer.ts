import { Reducer } from 'redux';
import { defaults } from 'lodash/fp';
import * as uuid from 'uuid/v1';
// import goal from './GoalRow/reducer';
import partialToCompleteGoal from '../../utils/partial-to-complete-goal';
import { StoreShape } from '../../store';


const goalReducer: Reducer = (x: GoalData, action: GoalActions) => {
  throw new Error('Not Implemented');
}

const defaultedStartTime = <T>(goal: T): T & {startingYear: number} => {
  return defaults({ startingYear: new Date().getFullYear() }, goal);
}

const fullGoalFromPartial = partialToCompleteGoal((goalData: GoalData) => {
  throw new Error(`Too many unset attributes for goal ${goalData.type}`);
});

export interface AddGoalAction {
  type: 'GOAL:ADD';
  goal: GoalRecord;
}

export interface UpdateGoalAction {
  goalID: string,
  attrName: LockableAttrName,
  newVal: number | string,
  type: 'GOAL:UPDATE';
}

export interface SetLockedGoalAction {
  goalID: string;
  attrName: LockableAttrName;
  type: 'GOAL:UPDATE:LOCKED'
}

type AddGoalParams = Omit<PartialGoal<number>, 'lockedAttr'>
// type AddGoalParams = PartialGoal<number>
export const addGoal = (goal: AddGoalParams): AddGoalAction => { 
  // We have to assign lockedAttr like this because of a TS limitation
  // https://github.com/Microsoft/TypeScript/issues/19497
  const lockedAttr = 'deadlineYear' as 'deadlineYear';
  const goalToAdd = {
    id: uuid(),
    lockedAttr,
    ...goal
  };
  return {
    type: 'GOAL:ADD',
    goal: defaultedStartTime(goalToAdd),
  };
};

const updateLocked = (state: GoalRecord, action: SetLockedGoalAction): GoalRecord => {
  return {
    ...state,
    lockedAttr: action.attrName,
  };
};

export const orderedGoalsFrom = (state: StoreShape): Array<GoalRecord> => (
  state.order.map((goalId: string) => (state.goals[goalId])) || []
);

// state: ObjectOf<Goal> = {},
type GoalActions = AddGoalAction | UpdateGoalAction | SetLockedGoalAction;

const reducer: Reducer<ObjectOf<GoalRecord>, GoalActions> = (state = {}, action: GoalActions) => {
  switch (action.type) {
  case 'GOAL:ADD': {
    const newGoal = action.goal;

    const completeGoal = fullGoalFromPartial(newGoal);

    if (!completeGoal) { return state; }
    return {
      ...state,
      [newGoal.id]: newGoal,
    };
  }
  case 'GOAL:UPDATE:LOCKED': {
    const uGoal: GoalRecord = state[action.goalID];
    return {
      ...state,
      [action.goalID]: updateLocked(uGoal, action),
    };
  }
  case 'GOAL:UPDATE': {
    const updateGoal = state[action.goalID];
    return {
      ...state,
      [action.goalID]: goalReducer(updateGoal, action),
    };
  }
  default:
    return state;
  }
}

export default reducer;
