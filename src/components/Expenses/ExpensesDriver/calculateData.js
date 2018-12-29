import {
  isNumber,
  size,
  sum,
  toPairs,
} from 'lodash'

const toNode = (nodeName) => ({name: nodeName})

const calculateLayer = (parent, key, value, nodes, links) => {
  let weight = 0;
  if (isNumber(value)) {
    weight = value;
  } else {
    const kvPairs = toPairs(value);
    const childWeights = kvPairs.map(([k,v]) => calculateLayer(key, k, v, nodes, links));
    weight = sum(childWeights);
  }

  if (weight > 0) {
    nodes.add(key);
    if (parent) {
      links.add({
        source: parent,
        target: key,
        value: weight
      });
    }
  }
  return weight; // weight for entire layer
}

export const calculateData = (data) => {
  let rootedData; // function requires a single root node
  if(size(data) !== 1) {
    rootedData = {
      total: data
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
  }
};
