import * as React from 'react';
import classNames from 'classnames';
import './styles.css';

type ReactEventHandler = React.ReactEventHandler;

interface AvailableCashProps {
  availableCash: number;
  expensesTotal: number;
  incomeTotal: number;
  spendingSummary: string;
  updateHandler: ReactEventHandler;
}


const AvailableCash: React.SFC<AvailableCashProps> = ({ availableCash, expensesTotal, incomeTotal, spendingSummary, updateHandler }) => (
  <section className="AvailableCash">
      <span>Total Expenses: {expensesTotal}</span>
      <span>Total Income: {incomeTotal}</span>
      <span>
        <label className={classNames([spendingSummary])}>
           Monthly Available Cash: {availableCash}
           {/* <input
             type="number"
             value={availableCash}
             onChange={updateHandler}
           /> */}
        </label>
      </span>
  </section>
);

export default AvailableCash;
