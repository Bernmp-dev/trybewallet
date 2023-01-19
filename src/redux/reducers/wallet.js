import { SAVE_CURRENCIES } from '../actions/saveCurrencies';
import { SAVE_EXPENSES } from '../actions/saveExpenses';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenses2: [],
  data: [],
  convertedValues: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.data).filter((item) => item !== 'USDT'),
      data: action.data,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      expenses2: [...state.expenses2, action.expenses2],
      convertedValues: [...state.convertedValues, action.convertedValue],
    };
  default:
    return state;
  }
};

export default wallet;
