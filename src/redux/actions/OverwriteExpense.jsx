import currencies from '../../services/currenciesAPi';

export const OVERWRITE_EXPENSE = 'OVERWRITE_EXPENSE';

export const overwriteExpense = (expenses) => ({
  type: OVERWRITE_EXPENSE,
  expenses,
});

export function fetchEdit(expenses, newExpense, index) {
  return async (dispatch) => {
    const response = await currencies();
    newExpense.exchangeRates = response;
    expenses[index] = newExpense;
    dispatch(overwriteExpense(expenses));
  };
}
