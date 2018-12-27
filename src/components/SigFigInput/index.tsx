import React from 'react';

interface SigFigInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sigFigs: number;
  value: number;
}

export default class SigFigInput extends React.Component<SigFigInputProps> {
  render() {
    const { sigFigs, value: trueValue, ...otherProps } = this.props;
    const scalingFactor = Math.pow(10, sigFigs);
    const displayValue = Math.round(trueValue * scalingFactor) / scalingFactor; 
    
    return (
      <input 
        type="number"
        value={displayValue}
        {...otherProps}
      />
    );
  }
}
