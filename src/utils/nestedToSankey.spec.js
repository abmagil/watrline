import { partialRight, sortBy } from 'lodash';
import calculateData from './nestedToSankey';

const sortNode = partialRight(sortBy, 'name');

const sortLinks = partialRight(sortBy, ['source', 'target']);
const simple = {
  basic: 1,
  simple: 2,
};

const simpleExpect = {
  links: [
    {
      source: 'total',
      target: 'basic',
      value: 1,
    },
    {
      source: 'total',
      target: 'simple',
      value: 2,
    },
  ],
  nodes: [
    { name: 'basic' },
    { name: 'simple' },
    { name: 'total' },
  ],
};

const singleNest = {
  cat1: {
    cat2: {
      cat3: 200,
    },
  },
};

const singleNestExpect = {
  links: [
    {
      source: 'cat2',
      target: 'cat3',
      value: 200,
    },
    {
      source: 'cat1',
      target: 'cat2',
      value: 200,
    },
  ],
  nodes: [
    { name: 'cat1' },
    { name: 'cat2' },
    { name: 'cat3' },
  ],
};

const total = {
  mainCat: {
    subcat1: 0,
    subcat2: 100,
    subcat3: {
      subcat4: 200,
      subcat5: 1,
    },
  },
  secondCat: {
    subcat6: 300,
  },
  thirdCat: {
    subcat7: 0,
    subcat8: 0,
  },
};

const expected = {
  links: [
    {
      source: 'mainCat',
      target: 'subcat2',
      value: 100,
    },
    {
      source: 'mainCat',
      target: 'subcat3',
      value: 201,
    },
    {
      source: 'subcat3',
      target: 'subcat4',
      value: 200,
    },
    {
      source: 'subcat3',
      target: 'subcat5',
      value: 1,
    },
    {
      source: 'secondCat',
      target: 'subcat6',
      value: 300,
    },
    {
      source: 'total',
      target: 'mainCat',
      value: 301,
    },
    {
      source: 'total',
      target: 'secondCat',
      value: 300,
    },
  ],
  nodes: [
    { name: 'mainCat' },
    { name: 'subcat2' },
    { name: 'subcat3' },
    { name: 'subcat4' },
    { name: 'subcat5' },
    { name: 'secondCat' },
    { name: 'subcat6' },
    { name: 'total' },
  ],
};


describe('calculateData', () => {
  it('handles the simple case', () => {
    const sut = calculateData(simple);

    expect(sortNode(sut.nodes)).toEqual(sortNode(simpleExpect.nodes));
    expect(sortLinks(sut.links)).toEqual(sortLinks(simpleExpect.links));
  });

  it('recurses through a tree', () => {
    const sut = calculateData(singleNest);

    expect(sortNode(sut.nodes)).toEqual(sortNode(singleNestExpect.nodes));
    expect(sortLinks(sut.links)).toEqual(sortLinks(singleNestExpect.links));
  });


  it('filters 0s out of results', () => {
    expect(sortNode(calculateData(total).nodes)).toEqual(sortNode(expected.nodes));
    expect(sortLinks(calculateData(total).links)).toEqual(sortLinks(expected.links));
  });
});
