type ObjectOf<T> = {
  [key: string]: T;
}

type lockableAttrNames = 'spendingPerMonth'|'goalTotal'|'startingYear';

export interface Goal {
  id: string;
  type: string;
  goalTotal: number;
  spendingPerMonth: number;
  lockedAttr: lockableAttrNames;
  startingYear: Date;
  deadlineYear: number;
}
