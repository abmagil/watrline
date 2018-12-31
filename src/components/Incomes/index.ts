import { connect } from 'react-redux';
import { StoreShape } from '../../store';
import { IncomeView } from './component';
import { IncomeData } from '../../models/Income';
import { updateIncome } from './reducer';
import { Dispatch } from 'redux';

const mapStateToProps = (state: StoreShape) => ({
  incomes: state.incomes
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateIncome: (id: string, data: IncomeData) => {
    dispatch(
      updateIncome(
        id,
        data
      )
    )
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IncomeView);
