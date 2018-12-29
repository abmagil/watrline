import entries from 'lodash/entries';
import isNumber from 'lodash/isNumber';
import merge from 'lodash/merge';
import tail from 'lodash/tail';

interface CategorySpendingType {
  [x: string]: number|CategorySpendingType
}

// (k, v) => {k: v|{}}
const nestObject = (key: string, value: number|ObjectOf<number>): any => {
  const splitKey = key.split(/\./);

  if(tail(splitKey).length == 0) {
    return {
      [splitKey[0]]: value,
    };
  } else {
    return {
      [splitKey[0]]: nestObject(
        tail(splitKey).join('.'),
        value
      ),
    };
  }
};

export const flatToNested = (flatStructure: ObjectOf<number>): CategorySpendingType => {
  const listOfObjects = entries(flatStructure).map((entry) => {
    return nestObject(entry[0], entry[1]);
  });
  return merge({}, ...listOfObjects);
};

const flattenObject = (into: any, keyArr: any, value: any) => {
  if(isNumber(value)) {
    const key = keyArr.join('.');
    into[key] = value;
  } else {
    entries(value).forEach(([k,v]) => {
      flattenObject(into, [...keyArr, k], v);
    });
  }
};
