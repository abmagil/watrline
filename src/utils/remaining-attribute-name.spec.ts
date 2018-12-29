import remainingAttributeName from './remaining-attribute-name';

interface TestCase {
  testData: Array<string>;
  expected: Array<string>;
}

describe('remainingAttributeName', () => {
  [
    {testData: ['spendingPerMonth', 'goalTotal'], expected: ['deadlineYear' as LockableAttrName]},
    {testData: ['spendingPerMonth', 'deadlineYear'], expected: ['goalTotal' as LockableAttrName]},
    {testData: ['deadlineYear', 'goalTotal'], expected: ['spendingPerMonth' as LockableAttrName]},
  ].forEach(({testData, expected}: TestCase) => {
    it(`returns ${expected} when given '${testData.join('and')}'`, () => {
      expect(remainingAttributeName(testData as Array<LockableAttrName>)).toEqual(expected);
    })
  })
});
