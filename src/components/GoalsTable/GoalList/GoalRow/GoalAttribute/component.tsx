/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import DebouncedComponent from '../../../../DebouncedComponent';
import './styles.css';
// import NumericInput from '../../../../NumericInput';
import {ReactComponent as Lock} from '../../../../../lock.svg';

interface GoalAttributeProps {
  isLocked: boolean;
  value: number;
  attrName: LockableAttrName;
  goalID: string;
  lockedHandler: () => void;
  updateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class GoalAttribute extends React.PureComponent<GoalAttributeProps> {
  render() {
    const { isLocked, value, lockedHandler, updateHandler } = this.props;
    return (
      <span className="GoalAttribute">
        {isLocked
          ? <p>{value}</p>
          : (
            <React.Fragment>
              <Lock className="lock" onClick={lockedHandler} />
              <DebouncedComponent debouncePeriod={1000}>
                <input
                  type="number"
                  className="editable"
                  value={value}
                  onChange={updateHandler}
                  onDoubleClick={lockedHandler}
                />
              </DebouncedComponent>
            </React.Fragment>
          )
        }
      </span>
    );
  }
};

export default GoalAttribute;
/* eslint-enable */
