import { connect } from 'react-redux';
import { ExpensesForm } from './ExpensesForm';
import { flatToNested } from '../../../utils/categoryMapper';

const mapStateToProps = (state) => ({
  categories: flatToNested(state.expenses),
});
const mapDispatchToProps = (dispatch) => ({
  updateFn: ({path, e}) => {
    dispatch({
      type: 'CATEGORY:UPDATE_SPENDING',
      name: path,
      value: parseInt(e.target.value, 10),
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
