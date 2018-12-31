export type IncomeCadence = 'once'|'biweekly'|'monthly'|'yearly';
export const IncomeCadenceOptions = ['once','biweekly','monthly','yearly'];

export interface IncomeData {
  name: string;
  amount: number;
  cadence: IncomeCadence
}

export interface IncomeRecord extends IncomeData {
  id: string;
}
