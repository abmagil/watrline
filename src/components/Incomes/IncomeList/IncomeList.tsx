import React from 'react';
import entries from 'lodash/entries';
import { IncomeRecord } from '../../../models/Income';
import './styles.css';

interface IncomeListProps {
  incomes: ObjectOf<IncomeRecord>;
}

export const IncomeList = (props: IncomeListProps) => {
  const { incomes } = props;
  return (
    <ul className='IncomeList'>
      {entries(incomes).map(([incomeId, incomeData]) => (
        <li key={incomeId} className="IncomeDetails">
          <h3>{incomeData.name}</h3>
          <p>
            <span>{incomeData.amount}</span> {incomeData.cadence}
          </p>
        </li>)
      )}
    </ul>
  );
};
