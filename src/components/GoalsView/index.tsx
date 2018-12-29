import React from 'react';
import AvailableCash from '../AvailableCash';
import GoalsTable from '../GoalsTable';

export default class GoalsView extends React.Component {
  render() {
    return (
      <>
      <AvailableCash />
      <GoalsTable />
      </>
    )
  }
}
