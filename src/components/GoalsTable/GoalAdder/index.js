import { identity } from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GoalAdder from './component';
import { addGoal, orderedGoalsFrom } from '../reducer';
import { StoreShape } from '../../../store';
import { GoalRowType } from './component';
import partialToWhole from '../../../utils/goal-solver';


const mapStateToProps = (state) => ({
  orderedGoals: orderedGoalsFrom(state),
});

const mapDispatchToProps = (dispatch) => ({
  goalCompletionFn: partialToWhole(identity),
  maybeAddGoal: ({type, goalTotal, deadlineYear, spendingPerMonth}) => {
    dispatch(
      addGoal({
        deadlineYear: parseInt(deadlineYear, 10),
        goalTotal: parseInt(goalTotal, 10),
        spendingPerMonth: parseInt(spendingPerMonth, 10),
        startingYear: Date.now(), 
        type,
      })
    );
    throw new Error('Need to gate behind valid goal');
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalAdder);






