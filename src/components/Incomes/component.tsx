import React from 'react';
import { IncomeData, IncomeRecord } from '../../models/Income';
import IncomeAdder from './IncomeAdder';
import { IncomeList } from './IncomeList/IncomeList';

interface IncomeProps {
  updateIncome: (id: string, data: IncomeData) => void;
  incomes: ObjectOf<IncomeRecord>;
}

export class IncomeView extends React.PureComponent<IncomeProps> {
  render() {
    return (
      <section className="Incomes">
        <IncomeAdder />
        <IncomeList incomes={this.props.incomes} />
      </section>
    );
  }
}
