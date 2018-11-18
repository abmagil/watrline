// Allows excluding a key from inside a type
// Example
// interface Test {
//   a: string;
//   b: number;
//   c: boolean;
// }

/**
 * Omit a single property:
 * type OmitA = Omit<Test, "a">; // Equivalent to: {b: number, c: boolean}
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/** Return a tuple of the types of the arguments of a function */
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

/**
 * A simple Dictionary-like structure, where all values are of a type
 */
declare type ObjectOf<T> = {
  [key: string]: T;
}

/**
 * Mapping type, where all values in the entered type become type 'string'
 */
declare type Stringified<T> = {
  [P in keyof T]: string;
}

declare type Numberified<T> = {
  [P in keyof T]: number;
}

/**
 * Given an action, returns that action without its 'type' property, as would
 * normally be taken as inputs to an Action Creator
 */
declare type ActionDetails<T extends {type: string}> = Omit<T, 'type'>;

/**
 * The attributes of a goal which can be locked
 */
type LockableAttrName = 'spendingPerMonth'|'goalTotal'|'deadlineYear';

