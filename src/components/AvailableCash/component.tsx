import * as React from 'react';
import './styles.css';

type ReactEventHandler = React.ReactEventHandler;

interface AvailableCashProps {
  availableCash: number;
  expensesTotal: number;
  incomeTotal: number;
}


const AvailableCash: React.SFC<AvailableCashProps> = ({ availableCash, expensesTotal, incomeTotal }) => (
  <section className="AvailableCash">
      <span>Total Expenses: {expensesTotal}</span>
      <span>Total Income: {incomeTotal}</span>
      <span>Monthly Available Cash: {availableCash}</span>
  </section>
);

export default AvailableCash;
