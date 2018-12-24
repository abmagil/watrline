import { connect } from 'react-redux';
import { Dispatch, ActionCreator } from 'redux';
import GoalRow from './component';
import { availableCashFrom } from '../../../AvailableCash';
import spendingSummary, { SpendingSummary } from '../../../../utils/spending-summary';
import { StoreShape } from '../../../../store';
import { MoveGoalUpAction, MoveGoalDownAction } from '../../../Order/reducer';
import { GoalRecord } from '../../../../models/Goal';

interface OwnProps {
  spendingToThisGoal: number;
  goal: GoalRecord;
}

const moveUp: ActionCreator<MoveGoalUpAction> = (id: string) => ({ type: 'GOAL:MOVE_UP', id});
const moveDown = (id: string): MoveGoalDownAction => ({ type: 'GOAL:MOVE_DOWN', id});

const mapStateToProps = (state: StoreShape, ownProps: OwnProps) => {
  const { goal, spendingToThisGoal } = ownProps;
  return {
    goal,
    spendingSummary: spendingSummary(spendingToThisGoal / availableCashFrom(state)) as SpendingSummary,
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
