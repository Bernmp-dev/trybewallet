import currencies from '../../services/currenciesAPi';

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  expenses,
});

export function fetchData(expenses) {
  return async (dispatch) => {
    const response = await currencies();
    expenses.exchangeRates = response;
    dispatch(saveExpenses(expenses));
  };
}
