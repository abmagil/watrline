import * as React from 'react';
import GoalRowContainer from './GoalRow';
import { GoalRecord } from '../../../models/Goal';


interface GoalListProps {
  orderedGoals: Array<GoalRecord>;
  cumulativeGoalSpending: Array<number>;
}

const GoalList = ({ orderedGoals, cumulativeGoalSpending = [] }: GoalListProps) => (
  <React.Fragment>
    {orderedGoals.map((goal, idx) => (
      <GoalRowContainer
        goal={goal}
        spendingToThisGoal={cumulativeGoalSpending[idx]}
        key={goal.id}
      />
    ))}
  </React.Fragment>
);

export default GoalList;
