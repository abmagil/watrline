import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AvailableCash from './component';
import { StoreShape } from '../../store';
import spendingSummaryFn from '../../utils/spending-summary';
import { totalGoalSpendingFrom, setAvailableCash } from './reducer';

export const availableCashFrom = (state: StoreShape) => (state.availableCash);

const mapStateToProps = (state: StoreShape) => ({
  availableCash: availableCashFrom(state),
  spendingSummary: spendingSummaryFn(totalGoalSpendingFrom(state) / availableCashFrom(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateHandler: (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setAvailableCash(Number(event.currentTarget.value)));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableCash);

