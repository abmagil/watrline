import * as React from 'react';
import MaskedInput from '../MaskedInput';

interface NumericInputProps {
  value: string | number | Array<string> | undefined;
}

const NON_NUMERIC_PATTERN = /[^\d.]/gi;

// USE LATER
// const LEADING_DECIMAL = /^\./;
// const DECIMAL_PATTERN = /(.*?)\.(.*)/;

function stripNonNumeric(val: string) {
  return parseInt(String(val).replace(NON_NUMERIC_PATTERN, ''), 10);
}

const NumericInput = ({...rest}: NumericInputProps) => (
  <MaskedInput
    validatorFn={stripNonNumeric}
    type="number"
    {...rest}
  />
);

export default NumericInput;
