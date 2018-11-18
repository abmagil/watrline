import remainingAttributeName from './remaining-attribute-name';

interface TestCase {
  testData: Array<LockableAttrName>;
  expected: Array<LockableAttrName>;
}

describe('remainingAttributeName', () => {
  [
    {testData: ['spendingPerMonth', 'goalTotal'], expected: ['deadlineYear']},
    {testData: ['spendingPerMonth', 'deadlineYear'], expected: ['goalTotal']},
    {testData: ['deadlineYear', 'goalTotal'], expected: ['spendingPerMonth']},
  ].forEach(({testData, expected}: TestCase) => {
    it(`returns ${expected} when given '${testData.join('and')}'`, () => {
      expect(remainingAttributeName(testData)).toEqual(expected);
    })
  })
});
