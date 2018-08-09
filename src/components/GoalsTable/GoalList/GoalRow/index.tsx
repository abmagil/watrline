import { connect } from 'react-redux';
import { Dispatch, ActionCreator } from 'redux';
import GoalRow from './component';
import { availableCashFrom } from '../../../AvailableCash/';
import spendingSummary from '../../../../utils/spending-summary';
import { StoreShape } from '../../../../store';
import { UpdateGoalAction, SetLockedGoalAction } from '../../reducer';
import { MoveGoalUpAction, MoveGoalDownAction } from '../../../Order/reducer';

interface OwnProps {
  spendingToThisGoal: number;
  goal: GoalRecord;
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

const moveUp: ActionCreator<MoveGoalUpAction> = (id: string) => ({ type: 'GOAL:MOVE_UP', id});
const moveDown = (id: string): MoveGoalDownAction => ({ type: 'GOAL:MOVE_DOWN', id});

const mapStateToProps = (state: StoreShape, ownProps: OwnProps) => {
  const { goal, spendingToThisGoal } = ownProps;
  return {
    goal,
    spendingSummary: spendingSummary(spendingToThisGoal / availableCashFrom(state)),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onUpClick: (id: string) => {
    dispatch(moveUp(id));
  },
  onDownClick: (id: string) => {
    dispatch(moveDown(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalRow);
