/**
 * The shape of a Goal
 * 
 * I'm trying very hard to keep goals as POJOs, so they can be instantiated with
 * object literals.
 */
export const LockableAttributes: Array<LockableAttrName> = ['spendingPerMonth', 'goalTotal', 'deadlineYear'];
declare type LockableAttrName = 'spendingPerMonth'|'goalTotal'|'deadlineYear';

export interface GoalBase {
  type: string;
  goalTotal: number;
  deadlineYear: number;
  spendingPerMonth: number;
  startingDate?: Date
}

/**
 * The basic data which makes up a goal
 */
export interface GoalData extends GoalBase {
  lockedAttr?: LockableAttrName;
}

/**
 * A Goal with enough data to be entered into the store or persisted
 */
export interface GoalRecord extends GoalData {
  id: string;
  lockedAttr: LockableAttrName;
}

export interface Total {
  deadlineYear: number;
  spendingPerMonth: number;
  startingDate?: Date;
}

export interface MonthsOfSpending {
  goalTotal: number;
  spendingPerMonth: number;
}
export interface SpendingPerMonth {
  goalTotal: number;
  deadlineYear: number;
  startingDate?: Date;
}
export interface EndYear {
  goalTotal: number;
  spendingPerMonth: number;
  startingDate?: Date;
}

export type GoalMissingTotal = Omit<GoalBase, 'goalTotal'>
export type GoalMissingDeadline = Omit<GoalBase, 'deadlineYear'>
export type GoalMissingSpendingPerMonth = Omit<GoalBase, 'spendingPerMonth'>
