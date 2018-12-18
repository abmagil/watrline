import { connect } from 'react-redux';
import GoalsTable from './component';
import { orderedGoalsFrom } from './reducer';
import { StoreShape } from '../../store';


const mapStateToProps = (state: StoreShape) => ({
  orderedGoals: orderedGoalsFrom(state),
});

export default connect(mapStateToProps, {})(GoalsTable);
