import { connect } from 'react-redux';
import * as React from 'react';
import { StoreShape } from '../../../../../store';
import { Dispatch } from 'redux';
import { SetLockedGoalAction, UpdateGoalAction } from '../../../reducer';
import GoalAttribute from './component';


interface OwnProps {
  goalID: string;
  attrName: LockableAttrName;
}

export const updateGoal = ({ goalID, attrName, newVal }: ActionDetails<UpdateGoalAction>): UpdateGoalAction => ({
  type: 'GOAL:UPDATE',
  attrName,
  newVal,
  goalID,
});

export const updateLocked = ({ goalID, attrName }: ActionDetails<SetLockedGoalAction>): SetLockedGoalAction => ({
  type: 'GOAL:UPDATE:LOCKED',
  goalID,
  attrName,
});


const mapStateToProps = (state: StoreShape, ownProps: OwnProps) => {
  const { goalID, attrName } = ownProps;
  const goal = state.goals[goalID];

  return {
    isLocked: attrName === goal.lockedAttr,
    value: goal[attrName],
    attrName,
    goalID,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const { attrName, goalID } = ownProps;
  
  return {
    updateHandler: (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateGoal({
          newVal: Number(event.target.value),
          goalID,
          attrName,
        })
      );
    },
    lockedHandler: () => {
      dispatch(
        updateLocked({
          goalID,
          attrName,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalAttribute);
