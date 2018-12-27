/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import DebouncedComponent from '../../../../DebouncedComponent';
import './styles.css';
// import NumericInput from '../../../../NumericInput';
import { ReactComponent as Lock } from '../../../../../lock.svg';
import classNames from 'classnames';
import SigFigInput from '../../../../SigFigInput';

interface GoalAttributeProps {
  isLocked: boolean;
  value: number;
  attrName: LockableAttrName;
  goalID: string;
  title: string;
  lockedHandler: () => void;
  updateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class GoalAttribute extends React.PureComponent<GoalAttributeProps> {
  render() {
    const { isLocked, value, lockedHandler, updateHandler, title } = this.props;
    return (
      <span className={classNames([{ "locked": isLocked }, "GoalAttribute"])}>
        {isLocked
          ? (
            <React.Fragment>
              <Lock className="lock" />
              <p>{title}: {value}</p>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <label onClick={lockedHandler} >{title}</label>
                <DebouncedComponent debouncePeriod={1000}>
                  <SigFigInput
                    className="editable"
                    value={value}
                    onChange={updateHandler}
                    onDoubleClick={lockedHandler}
                    sigFigs={2}
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
