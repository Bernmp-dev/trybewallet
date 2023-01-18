export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (expenses, convertedValues) => ({
  type: SAVE_EXPENSES,
  expenses,
  convertedValues,
});
