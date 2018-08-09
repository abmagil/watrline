import {
  entries,
  isNumber,
  merge,
  tail
} from 'lodash';

export type CategorySpendingType = number | CategorySpendingTree;
interface CategorySpendingTree {
  [x: string]: CategorySpendingType
}

// (k, v) => {k: v|{}}
const nestObject = (key: string, value: number): ObjectOf<CategorySpendingType> => {
  const splitKey = key.split(/\./);
  
  if(tail(splitKey).length === 0) {
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

export const flatToNested = (flatStructure: ObjectOf<number>) => {
  const listOfObjects = entries(flatStructure).map((entry) => {
    return nestObject(entry[0], entry[1]);
  });
  return merge({}, ...listOfObjects);
};

const flattenObject = (into: ObjectOf<number>, keyArr: Array<string>, value: CategorySpendingType) => {
  if(isNumber(value)) {
    const key = keyArr.join('.');
    into[key] = value;
  } else {
    entries(value).forEach(([k,v]) => {
      flattenObject(into, [...keyArr, k], v);
    });
  }
};

export const nestedToFlat = (nestedStructure: ObjectOf<CategorySpendingType>): ObjectOf<number> => {
  // tslint:disable-next-line:prefer-const
  let built = {};

  entries(nestedStructure).forEach(([key, value]) => {
    flattenObject(built, [key], value);
  });
  return built;
};
