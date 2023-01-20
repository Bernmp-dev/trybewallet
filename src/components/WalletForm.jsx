import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions/saveCurrencies';
import { saveExpenses } from '../redux/actions/saveExpenses';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    expenses: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleExpenses = ({ expenses, value, description,
    currency, method, tag }) => {
    const { dispatch, data } = this.props;

    dispatch(fetchCurrencies());

    const expensesData = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    dispatch(saveExpenses(expensesData));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      expenses: [...expenses, expensesData],
    });
  };

  render() {
    const { currencies: mapCurrencies } = this.props;
    const { value, description } = this.state;
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
        >
          {mapCurrencies && mapCurrencies
            .map((item, i) => <option key={ i } value={ item }>{ item }</option>)}
        </select>
        <select
          name="method"
          data-testid="method-input"
          onChange={ (e) => this.handleChange(e) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ (e) => this.handleChange(e) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="reset"
          onClick={ () => this.handleExpenses(this.state) }
        >
          Adicionar Despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => (
  { currencies: state.wallet.currencies,
    data: state.wallet.data,
    edit: state.wallet.edit,
    idToEdit: state.wallet.idToEdit,
  });

export default connect(mapStateToProps)(WalletForm);

WalletForm.defaultProps = {
  currencies: ['USD'],
  data: {},
};

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      codein: PropTypes.string,
      name: PropTypes.string,
      high: PropTypes.string,
      low: PropTypes.string,
      varBid: PropTypes.string,
      pctChange: PropTypes.string,
      bid: PropTypes.string,
      ask: PropTypes.string,
      timestamp: PropTypes.string,
      create_date: PropTypes.string,
    }),
  ),
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
