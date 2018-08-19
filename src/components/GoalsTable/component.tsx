import * as React from 'react';
import GoalList from './GoalList';
import cdf from '../../utils/cdf';

type GoalFn = <T>(fn: T) => GoalRowType;
interface DispatchProps {
  maybeAddGoal: (args: GoalRowType) => void;
  goalCompletionFn: GoalFn;
}

interface StateProps {
  orderedGoals: Array<GoalRecord>;
}

type TableProps = DispatchProps & StateProps;

interface TableState {
  cumulativeGoalSpending: Array<number>,
  goalData: GoalRowType|Stringified<GoalData>;
}

const cumulativeGoalSpendingFor = (goals: Array<GoalData>) => (
  cdf(goals.map((goal) => (goal.spendingPerMonth)))
);

class GoalsTable extends React.Component<TableProps, TableState> {
  onClick: (args: Stringified<GoalRowType>) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  
  constructor(props: TableProps) {
    super(props);
    this.onClick = this.props.maybeAddGoal.bind(this);
    const changeHandler = this.props.goalCompletionFn;
    this.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { currentTarget } = event;
      const newData = changeHandler({
        ...this.state.goalData,
        [currentTarget.name]: currentTarget.value,
      });
      this.setState({
        goalData: newData,
      });
    };

    this.state = {
      cumulativeGoalSpending: [],
      goalData: {
        type: '',
        goalTotal: '',
        deadlineYear: '',
        spendingPerMonth: '',
        startingYear: `${new Date().getFullYear()}`,
      },
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
    const { cumulativeGoalSpending, goalData } = this.state;
    
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
          <GoalList
            orderedGoals={orderedGoals}
            cumulativeGoalSpending={cumulativeGoalSpending}
          >
            <tr>
              <td>
                <input
                  name="type"
                  placeholder="Description" 
                  value={goalData.type}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <input
                  name="goalTotal"
                  placeholder="Cost"
                  value={goalData.goalTotal}
                  onChange={this.onChange}
                  type="number"
                />
              </td>
              <td>
                <input
                  name="deadlineYear"
                  placeholder="Deadline"
                  value={goalData.deadlineYear}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <input
                  name="spendingPerMonth"
                  placeholder="Monthly Cost"
                  value={goalData.spendingPerMonth}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <button
                  onClick={() => this.onClick(goalData)}
                >
                  Add
                </button>
              </td>
            </tr>
          </GoalList>
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
