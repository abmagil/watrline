/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import DebouncedComponent from '../../../../DebouncedComponent';
// import NumericInput from '../../../../NumericInput';
// import Lock from '../../assets/svg/locked.svg';

interface LockProps {
  className: string;
  onClick: () => void;
}

const Lock = ({className, onClick}: LockProps) => (
  <svg
    className={className}
    onClick={onClick}
  />
);

interface GoalAttributeProps {
  isLocked: boolean;
  value: number;
  attrName: LockableAttrName;
  goalID: string;
  lockedHandler: () => void;
  updateHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// const GoalAttribute = ({ isLocked, value, lockedHandler, updateHandler }: GoalAttributeProps) => {
class GoalAttribute extends React.PureComponent<GoalAttributeProps> {
  render() {
    const { isLocked, value, lockedHandler, updateHandler } = this.props;
    return (
      <td className="cell">
        <div className="goalAttribute">
          {isLocked
            ? <p>{value}</p>
            : (
              <div>
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
              </div>
              )
          }
        </div>
      </td>
    );
  }
};

export default GoalAttribute;
/* eslint-enable */
