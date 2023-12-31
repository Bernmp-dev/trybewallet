import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAnExpense } from '../redux/actions/deleteExpense';
import { editExpense } from '../redux/actions/editExpenses';

class Table extends Component {
  deleteOnclick = (id) => {
    const { expenses, dispatch } = this.props;
    const deleteExpense = expenses.filter((item) => id !== item.id);

    // const fixDelArray = deleteExpense
    //   .map((item, i) => ({ ...item, id: i }));

    dispatch(deleteAnExpense(deleteExpense));
  };

  editOnClick = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id, true));
  };

  render() {
    const { expenses } = this.props;

    const fix = (number) => Number(number).toFixed(2);
    const mil = 10000;
    const random = Math.floor(Math.random() * mil) + 1;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item, i) => (
            <tr key={ random + i }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{fix(item.value)}</td>
              <td>{item.exchangeRates[item.currency].name}</td>
              <td>{fix(item.exchangeRates[item.currency].ask)}</td>
              <td>{fix(item.value * item.exchangeRates[item.currency].ask)}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => this.editOnClick(item.id) }
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.deleteOnclick(item.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => (
  {
    expenses: state.wallet.expenses,
  });

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      exchangeRates: PropTypes.shape({
        [PropTypes.string]: PropTypes.shape({
          ask: PropTypes.string,
          name: PropTypes.string,
        }),
      }),
    }),
  ).isRequired,
};
