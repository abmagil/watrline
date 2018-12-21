import * as React from 'react';
import GoalList from './GoalList';
import cdf from '../../utils/cdf';
import { GoalRecord, GoalData } from '../../models/Goal';
import GoalAdder from './GoalAdder';
import './styles.css';


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
      <div className="GoalsTable">
        <div className="GoalsTable__header">
          <span>Description</span>
          <span>Cost</span>
          <span>Deadline</span>
          <span>Monthly Cost</span>
          <span>&nbsp;</span>
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
