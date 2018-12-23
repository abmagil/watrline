import * as calculated from './attr-relationships';
import { EndYear, SpendingPerMonth, Total } from 'src/models/Goal';

describe('Attribute relationship functions', () => {
  describe('endYear', () => {
    it('should return the year when a goal ends, given a start date, and financial data', () =>{
      const props: EndYear = { goalTotal: 1200, spendingPerMonth: 100, startingDate: new Date(2016, 0) }

      expect(calculated.endYear(props)).toBe(2017);
    });
    // TODO better define "already paid for". What year does a goal end in if it costs 1 dollar and you put in 1/mo. and it's already December?
    it('should return the starting year if a goal is already paid for', () => {
      const props: EndYear = { goalTotal: 0, spendingPerMonth: 10, startingDate: new Date(2016, 0) }

      const calculatedEndYear = calculated.endYear(props);
      expect(calculatedEndYear).toBe(2016);
    });
    it('should return Infinity if a goal cannot be paid for', () => {
      const props: EndYear = { goalTotal: 10, spendingPerMonth: 0, startingDate: new Date(2016, 0) }

      expect(calculated.endYear(props)).toBe(Infinity);      
    });
    it('should handle JS\'s stupid 0/0 === NaN edge case', () => {
      const props: EndYear = { goalTotal: 0, spendingPerMonth: 0, startingDate: new Date(2016, 0) }

      expect(calculated.endYear(props)).toBe(Infinity);      
    });
  });

  describe('spendingPerMonth', () => {
    it('should calculate the monthly cost for a goal, given a total, starting date, and ending date', () => {
      const props: SpendingPerMonth = {
        deadlineYear: 2018,
        goalTotal: 1200,
        startingDate: new Date(2017, 0)
      };

      expect(calculated.spendingPerMonthFn(props)).toBe(100);
    });
    it('should return the goal total if the deadline is before start', () => {
      const props: SpendingPerMonth = {
        deadlineYear: 2000,
        goalTotal: 1200,
      };

      expect(calculated.spendingPerMonthFn(props)).toBe(1200);
    });
    it('should default startingYear to right now', () => {
      const oneYearFromNow = new Date().getFullYear() + 1;

      const props: SpendingPerMonth = {
        deadlineYear: oneYearFromNow,
        goalTotal: 1200,
      };

      expect(calculated.spendingPerMonthFn(props)).toBe(100);
    });
    it('should return goalTotal if startingYear and deadlineYear are the same', () => {
      const props: SpendingPerMonth = {
        deadlineYear: 2021,
        goalTotal: 1200,
        startingDate: new Date(2021, 0),
      }

      expect(calculated.spendingPerMonthFn(props)).toBe(1200);
    });
  });

  describe('total', () => {
    it('should calculate total available on this day in a given year, from a given outlay', () => {
      const props: Total = {
        deadlineYear: 2018,
        spendingPerMonth: 100,
        startingDate: new Date(2017, 11),
      };

      expect(calculated.total(props)).toBe(1200);
    });
    it('should return 0 when the deadlineYear is in the past', () => {
      const props: Total = {
        deadlineYear: 2000,
        spendingPerMonth: 100
      };

      expect(calculated.total(props)).toBe(0);
    });
    it('should default startingYear to right now', () => {
      const oneYearFromNow = new Date().getFullYear() + 1;
      
      const props: Total = {
        deadlineYear: oneYearFromNow,
        spendingPerMonth: 100,
      };

      expect(calculated.total(props)).toBe(1200);
    })
  })
});
