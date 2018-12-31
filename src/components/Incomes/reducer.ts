import { Action, Reducer } from "redux";
import { IncomeData, IncomeRecord } from "../../models/Income";
import uuid from 'uuid/v4';

interface AddIncomeAction extends Action<'ADD_INCOME'> {
  payload: IncomeRecord
}

interface UpdateIncomeAction extends Action<'UPDATE_INCOME'> {
  payload: {
    id: string;
    newData: IncomeData;
  }
}

export const addIncome = (payload: IncomeData): AddIncomeAction => ({
  type: 'ADD_INCOME',
  payload: {
    id: uuid(),
    ...payload
  }
});

export const updateIncome = (id: string, data: IncomeData): UpdateIncomeAction => ({
  type: 'UPDATE_INCOME',
  payload: {
    id,
    newData: data
  }
})

type IncomeActions = AddIncomeAction|UpdateIncomeAction;
const reducer: Reducer<ObjectOf<IncomeRecord>, IncomeActions> = (state: ObjectOf<IncomeRecord> = {}, action: IncomeActions) => {
  switch (action.type) {
    case 'ADD_INCOME': {
      const {payload} = action;
      return {
        ...state,
        [payload.id]: payload
      }
    }
    default:
      return state;
  }
} 

export default reducer;
