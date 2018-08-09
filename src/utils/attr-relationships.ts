import * as moment from 'moment';

interface MonthsUntil {
  deadlineMoment: moment.Moment;
  startingMoment: moment.Moment;
}
// Calculates distance to the end of given year
function monthsUntil({deadlineMoment, startingMoment}: MonthsUntil): number {
  const diff = deadlineMoment.diff(startingMoment, 'months');
  if (diff >= 0) {
    return diff;
  } else {
    return 1;
  }
}

interface MonthsOfSpending {
  goalTotal: number;
  spendingPerMonth: number;
}
function monthsOfSpending({ goalTotal, spendingPerMonth }: MonthsOfSpending): number {
  return Math.ceil(goalTotal / spendingPerMonth);
}

interface Total {
  deadlineYear: number;
  spendingPerMonth: number;
  startingYear?: number;
}
export function total({ spendingPerMonth, deadlineYear, startingYear=moment().year() }: Total): number {
  const deadlineMoment = moment(deadlineYear, 'Y');
  const startingMoment = moment(startingYear, 'Y');
  if (deadlineMoment < startingMoment) { return 0; }

  const spendingMonths = monthsUntil({deadlineMoment, startingMoment});

  return spendingPerMonth * spendingMonths;
}

interface SpendingPerMonth {
  goalTotal: number;
  deadlineYear: number;
  startingYear?: number;
}
export function spendingPerMonthFn({ goalTotal, deadlineYear, startingYear=moment().year() }: SpendingPerMonth): number {
  const deadlineMoment = moment(deadlineYear, 'Y');
  const startingMoment = moment(startingYear, 'Y');
  const spendingMonths = monthsUntil({deadlineMoment, startingMoment});

  if (spendingMonths <= 0) {
    return goalTotal;
  } else {
    return goalTotal / spendingMonths;
  }
}

interface EndYear {
  goalTotal: number;
  spendingPerMonth: number;
  startingYear?: number;
}
// Built in assumption that answer is "in year XXXX", i.e. by the end of XXXX
export function endYear({ goalTotal, spendingPerMonth, startingYear=moment().year() }: EndYear): number {
  const startingMoment = moment(startingYear, 'Y');
  const calculatedMonths = monthsOfSpending({goalTotal, spendingPerMonth});

  if (isFinite(calculatedMonths)) {
    return moment(startingMoment).add(calculatedMonths, 'M').year();
  } else {
    return Infinity;
  }
}
