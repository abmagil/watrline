import isFinite from 'lodash/isFinite';

// Ingest a goal, return an array of monthly spending, each index is cumulative
export default function goalToMonthlySpendingArray({ goalTotal, spendingPerMonth } = {}) {
  const isValid = isFinite(goalTotal) && isFinite(spendingPerMonth);

  let spendingArray = [];
  let spentSoFar = 0;
  while (isValid && spentSoFar < goalTotal) {
    spentSoFar = Math.min(spentSoFar + spendingPerMonth, goalTotal);
    spendingArray.push(spentSoFar);
  }

  return spendingArray;
}
