import currencies from '../../services/currenciesAPi';

export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const saveCurrencies = (data) => ({
  type: SAVE_CURRENCIES,
  data,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await currencies();
    dispatch(saveCurrencies(response));
  };
}
