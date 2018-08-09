import {
  isNumber,
  size,
  sum,
  toPairs
} from 'lodash';
import { CategorySpendingType } from './categories';

interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

interface SankeyNode {
  name: string;
}

const toNode = (nodeName: string): SankeyNode => ({name: nodeName});

const calculateLayer = (parent: null|string, key: string, value: CategorySpendingType, nodeSet: Set<string>, linkSet: Set<SankeyLink>): number => {
  let weight = 0;
  if (isNumber(value)) {
    weight = value;
  } else {
    const kvPairs = toPairs(value);
    const childWeights = kvPairs.map(([k,v]) => calculateLayer(key, k, v, nodeSet, linkSet));
    weight = sum(childWeights);
  }

  if (weight > 0) {
    nodeSet.add(key);
    if (parent) {
      linkSet.add({
        source: parent,
        target: key,
        value: weight,
      });
    }
  }
  return weight; // weight for entire layer
};

export default (data: CategorySpendingType) => {
  let rootedData; // function requires a single root node
  if(mySize(data) !== 1) {
    rootedData = {
      total: data,
    };
  } else {
    rootedData = data;
  }
  
  const nodeSet: Set<string> = new Set();
  const linkSet: Set<SankeyLink> = new Set();
  const root = Object.keys(rootedData)[0];
  calculateLayer(null, root, rootedData[root], nodeSet, linkSet);

  return {
    // spreading the set converts to an array
    links: [...linkSet],
    nodes: [...nodeSet].map(toNode),
  };
};

const mySize = (input: CategorySpendingType): number => {
  if (typeof input === 'number') {
    return 0;
  }

  return size(input);
}
