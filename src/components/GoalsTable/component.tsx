import * as React from 'react';
import GoalList from './GoalList';
import cdf from '../../utils/cdf';
import { GoalRecord, GoalData } from '../../models/Goal';
import GoalAdder from './GoalAdder';


interface TableProps {
  orderedGoals: Array<GoalRecord>;
}
interface TableState {
  cumulativeGoalSpending: Array<number>;
}

const cumulativeGoalSpendingFor = (goals: Array<GoalData>) => (
  cdf(goals.map((goal) => (goal.spendingPerMonth)))
);

class GoalsTable extends React.Component<TableProps, TableState> {
  
  constructor(props: TableProps) {
    super(props);

    this.state = {
      cumulativeGoalSpending: [],
    };
  }

  componentWillReceiveProps(nextProps: TableProps) {
    const { orderedGoals } = nextProps;
    this.setState({
      cumulativeGoalSpending: cumulativeGoalSpendingFor(orderedGoals),
    });
  }

  render() {
    const { orderedGoals } = this.props;
    const { cumulativeGoalSpending } = this.state;

    return (
      <table className="goalsTable">
        <thead className="goalsTable__header">
          <tr>
            <td>Description</td>
            <td>Cost</td>
            <td>Deadline</td>
            <td>Monthly Cost</td>
            <td>&nbsp;</td>
          </tr>
        </thead>
        <tbody>
          <GoalAdder />
          <GoalList
            orderedGoals={orderedGoals}
            cumulativeGoalSpending={cumulativeGoalSpending} />
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} />
            <td className="goalsTable__total">
              {cumulativeGoalSpending[orderedGoals.length - 1] || 0}
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default GoalsTable;
