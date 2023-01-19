export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (expenses, expenses2, convertedValue) => ({
  type: SAVE_EXPENSES,
  expenses,
  expenses2,
  convertedValue,
});
