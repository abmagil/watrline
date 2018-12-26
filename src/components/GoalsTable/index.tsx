import { connect } from 'react-redux';
import GoalsTable from './component';
import { orderedGoalsFrom } from './reducer';
import { StoreShape } from '../../store';
import { OnDragEndResponder, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { setIndex } from '../Order/reducer';
import { Dispatch } from 'redux';


const mapStateToProps = (state: StoreShape) => ({
  orderedGoals: orderedGoalsFrom(state),
});

interface DispatchProps {
  onDragEnd: OnDragEndResponder;
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDragEnd: (result: DropResult,provided: ResponderProvided) => {
    dispatch(
      setIndex({...result})
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GoalsTable);
