import * as React from 'react';
// import GoalRowContainer from '../../containers/GoalRowContainer';
// import GoalRow from '../GoalRow';

const GoalRowContainer = ({...props}: any) => (<tr />)

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
