import { SAVE_CURRENCIES } from '../actions/saveCurrencies';
import { SAVE_EXPENSES } from '../actions/saveExpenses';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
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
      convertedValues: [...state.convertedValues, action.convertedValues],
    };
  default:
    return state;
  }
};

export default wallet;
