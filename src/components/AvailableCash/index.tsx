import { connect } from 'react-redux';
import * as React from 'react';
import classNames from 'classnames';
import { Dispatch } from 'redux';
import { StoreShape } from '../../store';
import spendingSummary from '../../utils/spending-summary';
import { totalGoalSpendingFrom, setAvailableCash } from './reducer';

type ReactEventHandler = React.ReactEventHandler;

interface AvailableCashProps {
  availableCash: number;
  spendingSummary: string;
  updateHandler: ReactEventHandler;
}

const AvailableCash: React.SFC<AvailableCashProps> = ({ availableCash, spendingSummary, updateHandler }) => (
  <label className={classNames([spendingSummary, 'availableCash'])}>
    Monthly Available Cash
    <input
      type="number"
      value={availableCash}
      onChange={updateHandler}
    />
  </label>  
);

export const availableCashFrom = (state: StoreShape) => (state.availableCash);


const mapStateToProps = (state: StoreShape) => ({
  availableCash: availableCashFrom(state),
  spendingSummary: spendingSummary(totalGoalSpendingFrom(state) / availableCashFrom(state)),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateHandler: (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setAvailableCash(Number(event.currentTarget.value)));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableCash);

