import goalToMonthlySpendingArray from './goal-to-monthly-spending-array';
import moment from 'moment';

describe('goalToMonthlySpendingArray', () => {
  it('should return an empty array by default', () => {
    expect(goalToMonthlySpendingArray()).toEqual([]);
  });
  describe('for a valid goal', () => {
    it(`should have the last entry equivalent to the goal's total cost`, () => {
      const validGoal = {
        goalTotal: 115,
        deadlineYear: moment().year() + 1,
        spendingPerMonth: 10
      };

      const monthlySpending = goalToMonthlySpendingArray(validGoal);
      expect(monthlySpending[monthlySpending.length - 1]).toEqual(115);
    });
    it('should have the first entry equivalent to the monthly spending', () => {
      const validGoal = {
        goalTotal: 115,
        deadlineYear: moment().year() + 1,
        spendingPerMonth: 10
      };

      const monthlySpending = goalToMonthlySpendingArray(validGoal);
      expect(monthlySpending[0]).toEqual(10);
    });
    it('should have one entry for each month until the goal is paid', () => {
      const validGoal = {
        goalTotal: 115,
        deadlineYear: moment().year() + 1,
        spendingPerMonth: 10
      };

      expect(goalToMonthlySpendingArray(validGoal).length).toEqual(12);
    });
  });
});
