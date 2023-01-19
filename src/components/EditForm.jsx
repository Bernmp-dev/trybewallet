import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions/saveCurrencies';
import { saveExpenses } from '../redux/actions/saveExpenses';
import { editExpense } from '../redux/actions/editExpenses';
import { overwriteExpense } from '../redux/actions/OverwriteExpense';


class EditForm extends Component {
  constructor(props) {
    super(props);
    const { expenses, idToEdit, dispatch } = props;
    dispatch(fetchCurrencies());
    const selectedExpense = expenses.filter(({ id }) => id === idToEdit);
    const { id, value, description, currency,
      method, tag, exchangeRates } = selectedExpense[0];

    this.state = { id, value, description,
      currency, method, tag, exchangeRates,
    };
  }

  componentDidMount() {
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  closeEdit = ({ value, description,
    currency, method, tag }) => {
    const { dispatch, data, expenses, idToEdit } = this.props;

    const expensesData = {
      id: idToEdit,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    const itemIndex = expenses.findIndex(obj => obj.id === idToEdit);

    const newArray = expenses.map((val, i) => i === itemIndex ? expensesData : val);

    dispatch(overwriteExpense(newArray));
    dispatch(editExpense(0, false));
  };

  render() {
    const { expenses, currencies: mapCurrencies, idToEdit, editor } = this.props;
    const { value, description, method, tag, currency } = this.state;
    const index = expenses.findIndex(obj => obj.id === idToEdit);

    return (
      <form>
        <input
          name="value"
          value={ value }
          data-testid="value-input"
          type="text"
          placeholder="Valor"
          onChange={ (e) => this.handleChange(e) }
        />
        <input
          name="description"
          value={ description }
          data-testid="description-input"
          type="text"
          placeholder="Descrição"
          onChange={ (e) => this.handleChange(e) }
        />
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ (e) => this.handleChange(e) }
          defaultValue={ currency }
        >
          {mapCurrencies && mapCurrencies
            .map((item, i) => <option key={ i } value={ item }>{ item }</option>)}
        </select>
        <select
          name="method"
          data-testid="method-input"
          onChange={ (e) => this.handleChange(e) }
          defaultValue={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ (e) => this.handleChange(e) }
          defaultValue={ tag }

        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="reset"
          onClick={ () => this.closeEdit(this.state) }
        >
          Editar Despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => (
  { currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    data: state.wallet.data,
    editor: state.wallet.editor,
    idToEdit: state.wallet.idToEdit,
  });

export default connect(mapStateToProps)(EditForm);

EditForm.defaultProps = {
  currencies: ['USD'],
  data: {},
};

EditForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.oneOfType(PropTypes.string, PropTypes.shape({})),
};

// PropTypes.shape({
//   code: PropTypes.string,
//   codein: PropTypes.string,
//   name: PropTypes.string,
//   high: PropTypes.string,
//   low: PropTypes.string,
//   varBid: PropTypes.string,
//   pctChange: PropTypes.string,
//   bid: PropTypes.string,
//   ask: PropTypes.string,
//   timestamp: PropTypes.string,
//   create_date: PropTypes.string,
// }),
