export const OVERWRITE_EXPENSE = 'OVERWRITE_EXPENSE';

export const overwriteExpense = (expenses) => ({
  type: OVERWRITE_EXPENSE,
  expenses,
});
