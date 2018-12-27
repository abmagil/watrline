import * as React from 'react';
import classNames from 'classnames';
import './styles.css';

type ReactEventHandler = React.ReactEventHandler;

interface AvailableCashProps {
  availableCash: number;
  spendingSummary: string;
  updateHandler: ReactEventHandler;
}


const AvailableCash: React.SFC<AvailableCashProps> = ({ availableCash, spendingSummary, updateHandler }) => (
  <label className={classNames([spendingSummary, 'AvailableCash'])}>
     Monthly Available Cash
     <input
       type="number"
       value={availableCash}
       onChange={updateHandler}
     />
  </label>  
);

export default AvailableCash;
