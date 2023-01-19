export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const editExpense = (idToEdit, editor) => ({
  type: EDIT_EXPENSE,
  editor,
  idToEdit,
});
