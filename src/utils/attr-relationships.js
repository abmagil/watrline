import moment from 'moment';

// Calculates distance to the end of given year
function monthsUntil({deadlineMoment, startingMoment}) {
  const diff = deadlineMoment.diff(startingMoment, 'months');
  if (diff >= 0) {
    return diff;
  } else {
    return 1;
  }
}

function monthsOfSpending({ goalTotal, spendingPerMonth }) {
  return Math.ceil(goalTotal / spendingPerMonth);
}

export function total({ spendingPerMonth, deadlineYear, startingYear=moment().year() }) {
  const deadlineMoment = moment(deadlineYear, 'Y');
  const startingMoment = moment(startingYear, 'Y');
  if (deadlineMoment < startingMoment) { return 0; }

  const spendingMonths = monthsUntil({deadlineMoment, startingMoment});

  return spendingPerMonth * spendingMonths;
}

export function spendingPerMonth({ goalTotal, deadlineYear, startingYear=moment().year() }) {
  const deadlineMoment = moment(deadlineYear, 'Y');
  const startingMoment = moment(startingYear, 'Y');
  const spendingMonths = monthsUntil({deadlineMoment, startingMoment});

  if (spendingMonths <= 0) {
    return goalTotal;
  } else {
    return goalTotal / spendingMonths;
  }
}

// Built in assumption that answer is "in year XXXX", i.e. by the end of XXXX
export function endYear({ goalTotal, spendingPerMonth, startingYear=moment().year() }) {
  const startingMoment = moment(startingYear, 'Y');
  const calculatedMonths = monthsOfSpending({goalTotal, spendingPerMonth});

  if (isFinite(calculatedMonths)) {
    return moment(startingMoment).add(calculatedMonths, 'M').year();
  } else {
    return Infinity;
  }
}
