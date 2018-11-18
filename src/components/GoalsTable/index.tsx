import { identity } from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GoalsTable from './component';
import { addGoal, orderedGoalsFrom } from './reducer';
import partialToWhole from '../../utils/goal-solver';
import { StoreShape } from '../../store';
import { GoalRowType } from './GoalList/GoalRow/component';


const mapStateToProps = (state: StoreShape) => ({
  orderedGoals: orderedGoalsFrom(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  maybeAddGoal: ({type, goalTotal, deadlineYear, spendingPerMonth}: GoalRowType) => {
    dispatch(
      addGoal({
        goalTotal: parseInt(goalTotal, 10),
        startingYear: Date.now(), 
        deadlineYear: parseInt(deadlineYear, 10),
        spendingPerMonth: parseInt(spendingPerMonth, 10),
        type,
      })
    );
    throw new Error('Not Implemented Yet');
  },
  goalCompletionFn: partialToWhole(identity),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalsTable);
