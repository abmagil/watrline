// Allows excluding a key from inside a type
// Example
// interface Test {
//   a: string;
//   b: number;
//   c: boolean;
// }

// Omit a single property:
// type OmitA = Omit<Test, "a">; // Equivalent to: {b: number, c: boolean}
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

declare type ObjectOf<T> = {
  [key: string]: T;
}

declare type Stringified<T> = {
  [P in keyof T]: string;
}

// Given an action, returns that action without its 'type' property, as would
//  normally be taken as inputs to an Action Creator
declare type ActionDetails<T extends {type: string}> = Omit<T, 'type'>;

type LockableAttrName = 'spendingPerMonth'|'goalTotal'|'deadlineYear';

declare interface PartialGoal<T = string> {
  id?: string;
  type: string;
  lockedAttr: LockableAttrName
  goalTotal: T,
  deadlineYear: T,
  spendingPerMonth: T,
}

declare interface GoalData {
  type: string;
  goalTotal: number;
  spendingPerMonth: number;
  lockedAttr?: LockableAttrName;
  startingYear: number;
  deadlineYear: number;
}

declare interface GoalRowType {
  type: string;
  goalTotal: string;
  deadlineYear: string;
  spendingPerMonth: string;
}

type GoalMissingTotal = Omit<GoalData, 'goalTotal'>
type GoalMissingDeadline = Omit<GoalData, 'deadlineYear'>
type GoalMissingSpendingPerMonth = Omit<GoalData, 'spendingPerMonth'>
// CalculableGoalData has enough information to solve for missing information
declare type CalculableGoalData = GoalMissingTotal|GoalMissingDeadline|GoalMissingSpendingPerMonth
type GoalMissingTotalAndMonthly = Omit<GoalData, 'goalTotal'|'spendingPerMonth'>
type GoalMissingTotalAndDeadline = Omit<GoalData, 'goalTotal'|'deadlineYear'>
type GoalMissingMonthlyAndDeadline = Omit<GoalData, 'spendingPerMonth'|'deadlineYear'>
// IncalculableGoalData is missing too much information to solve for missing information
declare type IncalculableGoalData = GoalMissingTotalAndMonthly|GoalMissingTotalAndDeadline|GoalMissingMonthlyAndDeadline

declare interface GoalRecord extends GoalData {
  id: string;
  lockedAttr: LockableAttrName;
}

