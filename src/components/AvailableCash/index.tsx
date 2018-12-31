import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import AvailableCash from './component';
import { StoreShape } from '../../store';
import spendingSummaryFn from '../../utils/spending-summary';
import { totalGoalSpendingFrom, setAvailableCash } from './reducer';
import sum from 'lodash/sum';
import values from 'lodash/values';
import monthlyEquivalentIncome from '../Incomes/month-equivalent-income';


const totalIncomeFrom = (state: StoreShape) => {
  return sum(values(state.incomes).map(monthlyEquivalentIncome));
}
const totalExpensesFrom = (state: StoreShape) => {
  return sum(values(state.expenses));
}
export const availableCashFrom = (state: StoreShape) => (totalIncomeFrom(state) - totalExpensesFrom(state));

const mapStateToProps = (state: StoreShape) => ({
  availableCash: availableCashFrom(state),
  spendingSummary: spendingSummaryFn(totalGoalSpendingFrom(state) / availableCashFrom(state)),
  expensesTotal: totalExpensesFrom(state),
  incomeTotal: totalIncomeFrom(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateHandler: (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setAvailableCash(Number(event.currentTarget.value)));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableCash);


