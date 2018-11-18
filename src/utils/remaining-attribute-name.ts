import {LockableAttributes} from '../models/Goal';
import { differenceWith, isEqual } from 'lodash';

const remainingAttr = (existingAttributes: Array<LockableAttrName>): Array<LockableAttrName> => {
  const remainingAttributeName = differenceWith(LockableAttributes, existingAttributes, isEqual);

  return remainingAttributeName;
}

export default remainingAttr;
