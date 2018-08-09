import * as React from 'react';
import classNames from 'classnames';

type ReactEventHandler = React.ReactEventHandler;

interface AvailableCashProps {
  availableCash: number;
  spendingSummary: string;
  updateHandler: ReactEventHandler;
}


const AvailableCash: React.SFC<AvailableCashProps> = ({ availableCash, spendingSummary, updateHandler }) => (
  <label className={classNames([spendingSummary, 'availableCash'])}>
     Monthly Available Cash
     <input
       type="number"
       value={availableCash}
       onChange={updateHandler}
     />
  </label>  
);

export default AvailableCash;
