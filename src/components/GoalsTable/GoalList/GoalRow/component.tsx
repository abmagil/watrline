import * as React from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import GoalAttribute from './GoalAttribute';
import { GoalRecord } from '../../../../models/Goal';
import { SpendingSummary } from '../../../../utils/spending-summary';
import './styles.css';

interface DispatchProps {
  onUpClick: (id: string) => void;
  onDownClick: (id: string) => void;
}

interface StateProps {
  goal: GoalRecord;
  spendingSummary: SpendingSummary;
  index: number;
}

type GoalRowProps = DispatchProps & StateProps;

const GoalRow = ({ goal, spendingSummary, onUpClick, onDownClick, index }: GoalRowProps) => (
  <Draggable draggableId={goal.id} index={index}>
    {(provided) => (
      <li
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className={classNames(['GoalRow', spendingSummary])}>
        <span className="cell description">
          {goal.type}
        </span>
        <GoalAttribute attrName={'goalTotal'} goalID={goal.id} title={"Total"} />
        <GoalAttribute attrName={'deadlineYear'} goalID={goal.id} title={"Finished By"} />
        <GoalAttribute attrName={'spendingPerMonth'} goalID={goal.id} title={"Monthly Spending"} />
        <hr className="divider"/>
      </li>
    )}
  </Draggable>
);

export default GoalRow;
