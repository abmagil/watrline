/**
 * The shape of a Goal
 * 
 * I'm trying very hard to keep goals as POJOs, so they can be instantiated with
 * object literals.
 */
import { Moment } from 'moment';

export const LockableAttributes: Array<LockableAttrName> = ['spendingPerMonth', 'goalTotal', 'deadlineYear'];
declare type LockableAttrName = 'spendingPerMonth'|'goalTotal'|'deadlineYear';

export interface GoalBase {
  type: string;
  goalTotal: number;
  deadlineYear: number;
  spendingPerMonth: number;
}

/**
 * The basic data which makes up a goal
 */
export interface GoalData extends GoalBase {
  lockedAttr?: LockableAttrName;
  startingYear: number;
}

/**
 * A Goal with enough data to be entered into the store or persisted
 */
export interface GoalRecord extends GoalData {
  id: string;
  lockedAttr: LockableAttrName;
}

export interface MonthsUntil {
  deadlineMoment: Moment;
  startingMoment: Moment;
}
export interface MonthsOfSpending {
  goalTotal: number;
  spendingPerMonth: number;
}
export interface SpendingPerMonth {
  goalTotal: number;
  deadlineYear: number;
  startingYear?: number;
}
export interface EndYear {
  goalTotal: number;
  spendingPerMonth: number;
  startingYear?: number;
}

export type GoalMissingTotal = Omit<GoalData, 'goalTotal'>
export type GoalMissingDeadline = Omit<GoalData, 'deadlineYear'>
export type GoalMissingSpendingPerMonth = Omit<GoalData, 'spendingPerMonth'>
