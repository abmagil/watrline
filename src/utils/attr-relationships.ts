import * as Goal from '../models/Goal';
import * as setYear from 'date-fns/set_year';
import * as getYear from 'date-fns/get_year';
import * as differenceInMonths from 'date-fns/difference_in_months';
import * as addMonths from 'date-fns/add_months';
import * as isAfter from 'date-fns/is_after';
import { isFinite } from 'lodash';

// Calculates distance to the end of given year
interface MonthsUntil {
  deadlineDate: Date;
  startingDate: Date;
}
function monthsUntil({deadlineDate, startingDate}: MonthsUntil): number {
  const diff = differenceInMonths(deadlineDate, startingDate);
  if (diff >= 0) {
    return diff;
  } else {
    return 1;
  }
}
function monthsOfSpending({ goalTotal, spendingPerMonth }: Goal.MonthsOfSpending): number {
  return Math.ceil(goalTotal / spendingPerMonth);
}

export function total({ spendingPerMonth, deadlineYear, startingDate=new Date(), }: Goal.Total): number {
  const deadlineDate = setYear(startingDate, deadlineYear);
  
  if (isAfter(startingDate, deadlineDate)) { return 0;}

  const spendingMonths = monthsUntil({startingDate, deadlineDate});

  return spendingPerMonth * spendingMonths;
}

export function spendingPerMonthFn({ goalTotal, deadlineYear, startingDate=new Date(), }: Goal.SpendingPerMonth): number {
  const deadlineDate = setYear(startingDate, deadlineYear);
  const spendingMonths = monthsUntil({deadlineDate, startingDate});

  if (spendingMonths <= 0) {
    return goalTotal;
  } else {
    return goalTotal / spendingMonths;
  }
}

// Built in assumption that answer is "in year XXXX", i.e. by the end of XXXX
export function endYear({ goalTotal, spendingPerMonth, startingDate: startingYear=new Date() }: Goal.EndYear): number {
  const calculatedMonths = monthsOfSpending({goalTotal, spendingPerMonth});

  if (isFinite(calculatedMonths)) {
    return getYear(addMonths(startingYear, calculatedMonths));
  } else {
    return Infinity;
  }
}
