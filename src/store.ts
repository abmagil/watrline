  // tslint:disable:object-literal-key-quotes
  import { 
  createStore,
  combineReducers,
} from 'redux';

import defaultCategories, { Categories } from './default-categories';

import availableCash from './components/AvailableCash/reducer';
import goals from './components/GoalsTable/reducer';
import order from './components/Order/reducer';
import expenses from './components/Expenses/reducer';
import incomes from './components/Incomes/reducer';

import { GoalRecord } from './models/Goal';
import { IncomeRecord } from './models/Income';

const reducer = combineReducers({
  availableCash,
  goals,
  incomes,
  order,
  expenses,
});

export interface StoreShape {
  availableCash: number;
  expenses: Categories;
  incomes: ObjectOf<IncomeRecord>;
  goals: ObjectOf<GoalRecord>;
  order: Array<string>;  
}

const initialState: StoreShape = {
  expenses: defaultCategories(),
  goals: {
    '1': {
      deadlineYear: new Date().getFullYear() + 10,
      goalTotal: 1200,
      id: '1',
      lockedAttr: 'spendingPerMonth',
      spendingPerMonth: 10,
      startingDate: new Date(),
      type: 'Emergency Goal',
    },
    '2': {
      deadlineYear: new Date().getFullYear() + 20,
      goalTotal: 23800,
      id: '2',
      lockedAttr: 'deadlineYear',
      spendingPerMonth: 100,
      startingDate: new Date(),
      type: 'Education Goal',
    },
    '3': {
      deadlineYear: new Date().getFullYear() + 6,
      goalTotal: 12000,
      id: '3',
      lockedAttr: 'goalTotal',
      spendingPerMonth: 260.8695652173913,
      startingDate: new Date(),
      type: 'Travel Goal',
    },
  },
  order: [
    '3',
    '2',
    '1',
  ],
  availableCash: 400,
  incomes: {
    '123': {
      name: "salary",
      cadence: "monthly",
      amount: 1000,
      id: '123'
    }
  },
};

const store = createStore(
  reducer,
  initialState,
  // tslint:disable-next-line:no-string-literal
  window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
);

export default store;
// tslint:enable
