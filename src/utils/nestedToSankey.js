import {
  isNumber,
  size,
  sum,
  toPairs
} from 'lodash';

const toNode = (nodeName) => ({name: nodeName});

const calculateLayer = (parent, key, value, nodeSet, linkSet) => {
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

export default (data) => {
  let rootedData; // function requires a single root node
  if(size(data) !== 1) {
    rootedData = {
      total: data,
    };
  } else {
    rootedData = data;
  }
  
  const nodeSet = new Set();
  const linkSet = new Set();
  const root = Object.keys(rootedData)[0];
  calculateLayer(null, root, rootedData[root], nodeSet, linkSet);

  return {
    // spreading the set converts to an array
    nodes: [...nodeSet].map(toNode),
    links: [...linkSet],
  };
};
