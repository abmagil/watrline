import { partialRight, sortBy } from 'lodash';
import calculateData from './nestedToSankey';

const sortNode = partialRight(sortBy, 'name');
const sortLinks = partialRight(sortBy, ['source', 'target']);

const simple = {
  basic: 1,
  simple: 2,
};

const simpleExpect = {
  nodes: [
    { name: 'basic' },
    { name: 'simple' },
    { name: 'total' },
  ],
  links: [
    {
      source: 'basic',
      target: 'total',
      value: 1,
    },
    {
      source: 'simple',
      target: 'total',
      value: 2,
    },
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
  nodes: [
    { name: 'cat1' },
    { name: 'cat2' },
    { name: 'cat3' },
  ],
  links: [
    {
      source: 'cat3',
      target: 'cat2',
      value: 200,
    },
    {
      source: 'cat2',
      target: 'cat1',
      value: 200,
    },
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
  links: [
    {
      source: 'subcat2',
      target: 'mainCat',
      value: 100,
    },
    {
      source: 'subcat3',
      target: 'mainCat',
      value: 201,
    },
    {
      source: 'subcat4',
      target: 'subcat3',
      value: 200,
    },
    {
      source: 'subcat5',
      target: 'subcat3',
      value: 1,
    },
    {
      source: 'subcat6',
      target: 'secondCat',
      value: 300,
    },
    {
      source: 'mainCat',
      target: 'total',
      value: 301,
    },
    {
      source: 'secondCat',
      target: 'total',
      value: 300,
    },
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
