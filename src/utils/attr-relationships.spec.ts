import * as calculated from './attr-relationships';

describe('Attribute relationship functions', () => {
  describe('endYear', () => {
    it('should return the year when a goal ends, given a start date, and financial data', () =>{
      const props = { goalTotal: 1200, spendingPerMonth: 100, startingYear: 2016 }

      expect(calculated.endYear(props)).toBe(2017);
    });
    it('should return the starting year if a goal is already paid for', () => {
      const props = { goalTotal: 0, spendingPerMonth: 10, startingYear: 2016 }

      expect(calculated.endYear(props)).toBe(2016);
    });
    it('should return Infinity if a goal cannot be paid for', () => {
      const props = { goalTotal: 10, spendingPerMonth: 0, startingYear: 2016 }

      expect(calculated.endYear(props)).toBe(Infinity);      
    });
    it('should handle JS\'s stupid 0/0 === NaN edge case', () => {
      const props = { goalTotal: 0, spendingPerMonth: 0, startingYear: 2016 }

      expect(calculated.endYear(props)).toBe(Infinity);      
    });
  });

  describe('spendingPerMonth', () => {
    it('should calculate the monthly cost for a goal, given a total, starting date, and ending date', () => {
      const props = {
        deadlineYear: 2018,
        goalTotal: 1200,
        startingYear: 2017
      };

      expect(calculated.spendingPerMonthFn(props)).toBe(100);
    });
    it('should return the goal total if the deadline is before start', () => {
      const props = {
        deadlineYear: 2000,
        goalTotal: 1200,
      };

      expect(calculated.spendingPerMonthFn(props)).toBe(1200);
    });
    it('should default startingYear to right now', () => {
      const oneYearFromNow = new Date().getFullYear() + 1;

      const props = {
        deadlineYear: oneYearFromNow,
        goalTotal: 1200,
      };

      expect(calculated.spendingPerMonthFn(props)).toBe(100);
    });
    it('should return goalTotal if startingYear and deadlineYear are the same', () => {
      const props = {
        deadlineYear: 2021,
        goalTotal: 1200,
        startingYear: 2021,
      }

      expect(calculated.spendingPerMonthFn(props)).toBe(1200);
    });
  });

  describe('total', () => {
    it('should calculate total available at the end of a given year, from a given outlay', () => {
      const props = {
        deadlineYear: 2018,
        spendingPerMonth: 100,
        startingYear: 2017,
      };

      expect(calculated.total(props)).toBe(1200);
    });
    it('should return 0 when the deadlineYear is in the past', () => {
      const props = {
        deadlineYear: 2000,
        spendingPerMonth: 100
      };

      expect(calculated.total(props)).toBe(0);
    });
    it('should default startingYear to right now', () => {
      const oneYearFromNow = new Date().getFullYear() + 1;
      
      const props = {
        deadlineYear: oneYearFromNow,
        spendingPerMonth: 100,
      };

      expect(calculated.total(props)).toBe(1200);
    })

  })
});
