  // tslint:disable:object-literal-key-quotes
  import { 
  createStore,
  combineReducers,
} from 'redux';

import defaultCategories, { Categories } from './default-categories';

import availableCash from './components/AvailableCash/reducer';
import goals from './components/GoalsTable/reducer';
import order from './components/Order/reducer';
import spending from './components/Spending/reducer';

const reducer = combineReducers({
  availableCash,
  goals,
  order,
  spending,
});

export interface StoreShape {
  availableCash: number;
  goals: ObjectOf<GoalRecord>;
  order: Array<string>;
  spending: Categories;
}

const initialState: StoreShape = {
  spending: defaultCategories(),
  goals: {
    '1': {
      id: '1',
      type: 'Emergency Goal',
      goalTotal: 1200,
      spendingPerMonth: 10,
      lockedAttr: 'spendingPerMonth',
      startingYear: Date.now(),
      deadlineYear: 2028,
    },
    '2': {
      id: '2',
      type: 'Education Goal',
      deadlineYear: 2038,
      spendingPerMonth: 100,
      lockedAttr: 'deadlineYear',
      startingYear: Date.now(),
      goalTotal: 23800,
    },
    '3': {
      id: '3',
      type: 'Travel Goal',
      goalTotal: 12000,
      deadlineYear: new Date().getFullYear() + 6,
      lockedAttr: 'goalTotal',
      startingYear: Date.now(),
      spendingPerMonth: 260.8695652173913,
    },
  },
  order: [
    '3',
    '2',
    '1',
  ],
  availableCash: 400,
};

const store = createStore(
  reducer,
  initialState,
  // tslint:disable-next-line:no-string-literal
  window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
);

export default store;
// tslint:enable
