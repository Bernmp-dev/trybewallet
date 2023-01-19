export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  expenses,
});
