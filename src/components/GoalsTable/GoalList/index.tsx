import * as React from 'react';
import GoalRowContainer from './GoalRow';
import { GoalRecord } from '../../../models/Goal';


interface GoalListProps {
  orderedGoals: Array<GoalRecord>;
  cumulativeGoalSpending: Array<number>;
  children: any;
}

const GoalList = ({ orderedGoals, cumulativeGoalSpending = [], children }: GoalListProps) => (
  <tbody>
    {children}
    {orderedGoals.map((goal, idx) => (
      <GoalRowContainer
        goal={goal}
        spendingToThisGoal={cumulativeGoalSpending[idx]}
        key={goal.id}
      />
    ))}
  </tbody>
);

export default GoalList;
