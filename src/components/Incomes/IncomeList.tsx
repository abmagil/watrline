import React from 'react';
import entries from 'lodash/entries';
import { IncomeRecord } from '../../models/Income';
interface IncomeListProps {
  incomes: ObjectOf<IncomeRecord>;
}

export const IncomeList = (props: IncomeListProps) => {
  const { incomes } = props;
  return (<ul className='IncomeList'>
    {entries(incomes).map(([incomeId, incomeData]) => (<li key={incomeId}>
      <span>{incomeData.name}</span>: {incomeData.amount} {incomeData.cadence}
    </li>))}
  </ul>);
};
