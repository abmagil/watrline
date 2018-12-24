import * as React from 'react';
import classNames from 'classnames';
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
}

type GoalRowProps = DispatchProps & StateProps;

const ActionButton = ({...props}: any) => (<div />);

const GoalRow = ({ goal, spendingSummary, onUpClick, onDownClick }: GoalRowProps) => (
  <li className={classNames(['GoalRow', spendingSummary])}>
    <span className="cell description">
      {goal.type}
    </span>
    <GoalAttribute attrName={'goalTotal'} goalID={goal.id} />
    <GoalAttribute attrName={'deadlineYear'} goalID={goal.id} />
    <GoalAttribute attrName={'spendingPerMonth'} goalID={goal.id} />
    <span className="cell move">
      <ActionButton
        classNames={['up']} 
        onClick={() => onUpClick(goal.id)}
        altText="increase priority"
      />
      <ActionButton
        classNames={['down']}
        onClick={() => onDownClick(goal.id)}
        altText="reduce priority"
      />
    </span>
  </li>
);

export default GoalRow;
