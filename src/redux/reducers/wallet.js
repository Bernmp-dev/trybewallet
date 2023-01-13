import { SAVE_CURRENCIES } from '../actions/saveCurrencies';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state.wallet,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
