import currencies from '../../services/currenciesAPi';

export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const saveCurrencies = (token) => ({
  type: SAVE_CURRENCIES,
  payload: token,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await currencies();
    dispatch(saveCurrencies(response));
  };
}
