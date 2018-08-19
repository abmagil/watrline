/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import { identity } from 'lodash';

type InputValueType = string | number | Array<string> | undefined;
interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validatorFn(input: InputValueType): InputValueType;
}

/**
 * A generic component to clean user-entered data before it enters the store
 */
class MaskedInput extends React.PureComponent<MaskedInputProps> {
  render() {
      const {validatorFn = identity, value, type, ...remainingProps} = this.props;
      const holder = validatorFn(value);
      return <input {...remainingProps} type={type} value={holder} />
  }
}

export default MaskedInput;
/* eslint-enable */
