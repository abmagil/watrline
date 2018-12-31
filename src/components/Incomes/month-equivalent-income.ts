import { IncomeData } from "../../models/Income";

const monthlyEquivalentIncome = (income: IncomeData): number => {
  switch (income.cadence) {
    case 'yearly': {
      return income.amount / 12;
    }
    case 'monthly': {
      return income.amount;
    }
    case 'biweekly': {
      return income.amount * 2;
    }
    case 'once': {
      return income.amount / 12;
    }
    default: throw new Error('Incorrect cadence passed');
  }
}

  export default monthlyEquivalentIncome;
