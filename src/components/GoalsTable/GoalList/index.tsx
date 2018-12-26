import * as React from 'react';
import GoalRowContainer from './GoalRow';
import { GoalRecord } from '../../../models/Goal';
import { Droppable } from 'react-beautiful-dnd';
import './styles.css';

interface GoalListProps {
  orderedGoals: Array<GoalRecord>;
  cumulativeGoalSpending: Array<number>;
}

const GoalList = ({ orderedGoals, cumulativeGoalSpending = [] }: GoalListProps) => (
  <Droppable droppableId="droppable">
    {(provided) => (
      <ol 
        className="GoalList"
        ref={provided.innerRef}>
        {orderedGoals.map((goal, idx) => (
          <GoalRowContainer
            goal={goal}
            spendingToThisGoal={cumulativeGoalSpending[idx]}
            key={goal.id}
            index={idx}
          />
        ))}
        {provided.placeholder}
      </ol>      
    )}
  </Droppable>
);

export default GoalList;
