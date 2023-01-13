import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions/saveCurrencies';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <input data-testid="value-input" type="number" />
        <input data-testid="description-input" type="text" />
        <select data-testid="currency-input">
          {currencies && currencies
            .map((item, i) => <option key={ i } value={ item }>{ item }</option>)}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

      </form>
    );
  }
}

const mapStateToProps = (state) => (
  { currencies: state.wallet.currencies });

export default connect(mapStateToProps)(WalletForm);

WalletForm.defaultProps = {
  currencies: ['USD'],
};

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
};
