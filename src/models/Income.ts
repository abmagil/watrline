export type IncomeCadence = 'once'|'bimonthly'|'monthly'|'yearly';
export const IncomeCadenceOptions = ['once','bimonthly','monthly','yearly'];

export interface IncomeData {
  name: string;
  amount: number;
  cadence: IncomeCadence
}

export interface IncomeRecord extends IncomeData {
  id: string;
}
