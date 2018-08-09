import { identity } from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GoalsTable from './component';
import { addGoal, orderedGoalsFrom } from './reducer';
import partialToWhole from '../../utils/partial-to-complete-goal';
import { StoreShape } from '../../store';


const mapStateToProps = (state: StoreShape) => ({
  orderedGoals: orderedGoalsFrom(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  maybeAddGoal: ({type, goalTotal, deadlineYear, spendingPerMonth}: GoalRowType) => {
    dispatch(
      addGoal({
        goalTotal: parseInt(goalTotal, 10),
        deadlineYear: parseInt(deadlineYear, 10),
        spendingPerMonth: parseInt(spendingPerMonth, 10),
        type,
      })
    );
  },
  goalCompletionFn: partialToWhole(identity),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalsTable);
