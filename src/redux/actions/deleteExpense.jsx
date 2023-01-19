export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteAnExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});
