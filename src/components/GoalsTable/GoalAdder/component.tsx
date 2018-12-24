import * as React from 'react';
import { GoalBase, LockableAttributes } from '../../../models/Goal';
import { includes, last } from 'lodash/fp';
import remainingAttr from '../../../utils/remaining-attribute-name';
import './styles.css';

type GoalFn = <T>(fn: T) => GoalRowType;
interface GoalAdderProps {
  maybeAddGoal: (args: Stringified<GoalBase>) => void;
  goalCompletionFn: GoalFn;
}

interface GoalAdderState {
  goalData: GoalRowType;
  lastTwoChangedAttrs: Array<LockableAttrName>;
  isReady: boolean;
}

export type GoalRowType = Stringified<GoalBase>;

export default class GoalAdder extends React.Component<GoalAdderProps, GoalAdderState> {
  constructor(props: GoalAdderProps) {
    super(props);

    this.state = {
      goalData: {
        type: '',
        spendingPerMonth: '',
        goalTotal: '',
        deadlineYear: '',
      },
      lastTwoChangedAttrs: [],
      isReady: false,
    }
  }

  onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget;
    let { lastTwoChangedAttrs: newChangedAttrs } = this.state;
    let attributeToCalculate: LockableAttrName|undefined;

    if (includes(name, LockableAttributes)) { // protect against entering "type"
      if (!(last(newChangedAttrs) === name)) {
        // add it and handle available cases
        newChangedAttrs = [...newChangedAttrs, name as LockableAttrName];
      }

      // There are 1, 2, or 3 in the list now
      switch (newChangedAttrs.length) {
        case 1:
          break
        case 2:
          attributeToCalculate = remainingAttr(newChangedAttrs)[0];
          break;
        case 3:
          // keep the most previously changed, remove the other
          //
          newChangedAttrs = newChangedAttrs.slice(1);
          attributeToCalculate = remainingAttr(newChangedAttrs)[0];
          break;
        default: 
          throw new Error('how are there so many changed attrs?')
      }
    }

    const newGoalToBuild = {
      ...this.state.goalData,
      [name]: value
    };
    if (attributeToCalculate) {
      newGoalToBuild[attributeToCalculate] = '';
    }

    const newGoal = this.props.goalCompletionFn(newGoalToBuild);

    this.setState({
      goalData: newGoal,
      lastTwoChangedAttrs: newChangedAttrs,
    })
  };

  render() {
    const { maybeAddGoal } = this.props;
    const { goalData, isReady } = this.state;
    return <li className="GoalAdder">
        <input
          name="type"
          placeholder="Description"
          value={goalData.type}
          onChange={this.onChange}
        />
        <input
          name="goalTotal"
          placeholder="Cost"
          value={goalData.goalTotal}
          onChange={this.onChange}
          type="number"
        />
        <input
          name="deadlineYear"
          placeholder="Deadline"
          value={goalData.deadlineYear}
          onChange={this.onChange}
        />
        <input
          name="spendingPerMonth"
          placeholder="Monthly Cost"
          value={goalData.spendingPerMonth}
          onChange={this.onChange}
        />
        <button onClick={() => isReady && maybeAddGoal(goalData)}>
          Add
          </button>
    </li>
  }
}
