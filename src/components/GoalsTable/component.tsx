import * as React from 'react';
import GoalList from './GoalList';
import cdf from '../../utils/cdf';
import { GoalRecord, GoalData } from '../../models/Goal';
import GoalAdder from './GoalAdder';
import './styles.css';


interface TableProps {
  orderedGoals: Array<GoalRecord>;
}
interface TableState {}

const cumulativeGoalSpendingFor = (goals: Array<GoalData>) => (
  cdf(goals.map((goal) => (goal.spendingPerMonth)))
);

class GoalsTable extends React.Component<TableProps, TableState> {

  render() {
    const { orderedGoals } = this.props;
    const cumulativeGoalSpending = cumulativeGoalSpendingFor(orderedGoals);

    return (
      <div className="GoalsTable">
        <div className="GoalsTable__header">
          <span>Description</span>
          <span>Cost</span>
          <span>Deadline</span>
          <span>Monthly Cost</span>
        </div>
        <ol>
          <GoalAdder />
          <GoalList
            orderedGoals={orderedGoals}
            cumulativeGoalSpending={cumulativeGoalSpending} />
        </ol>
        <div className="GoalsTable__footer">
          <span className="GoalsTable__total">
            {cumulativeGoalSpending[orderedGoals.length - 1] || 0}
          </span>
        </div>
      </div>
    );
  }
}

export default GoalsTable;
