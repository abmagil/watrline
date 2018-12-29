import { Reducer } from 'redux';

export interface UpdateSpendingAction {
  type: 'CATEGORY:UPDATE_SPENDING';
  name: string;
  value: number;
}

const reducer: Reducer<ObjectOf<number>, UpdateSpendingAction> = (state = {}, action: UpdateSpendingAction) => {
  if (action.type === 'CATEGORY:UPDATE_SPENDING') {
    return {
      ...state,
      [action.name]: action.value,
    };
  }
  return state;
}

export default reducer;
