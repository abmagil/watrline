import * as React from 'react';
import classNames from 'classnames';
import GoalAttribute from './GoalAttribute';

interface DispatchProps {
  onUpClick: (id: string) => void;
  onDownClick: (id: string) => void;
}

interface StateProps {
  goal: GoalRecord;
  spendingSummary: number;
}


type GoalRowProps = DispatchProps & StateProps;

const ActionButton = ({...props}: any) => (<div />);

const GoalRow = ({ goal, spendingSummary, onUpClick, onDownClick }: GoalRowProps) => (
  <tr className={classNames(['goalRow', spendingSummary])}>
    <td className="cell description">
      {goal.type}
    </td>
    <GoalAttribute attrName={'goalTotal'} goalID={goal.id} />
    <GoalAttribute attrName={'deadlineYear'} goalID={goal.id} />
    <GoalAttribute attrName={'spendingPerMonth'} goalID={goal.id} />
    <td className="cell move">
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
    </td>
  </tr>
);

export default GoalRow;
