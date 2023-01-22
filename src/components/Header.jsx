import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    // const defEmail = localStorage.getItem('email');
    const { expenses, email } = this.props;

    const result = expenses.reduce((acc, curr) => {
      acc += curr.value * curr.exchangeRates[curr.currency].ask;
      return acc;
    }, 0);

    const totalValue = parseFloat(result.toFixed(2));

    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <br />
        <span data-testid="total-field">{totalValue || '0.00'}</span>
        <br />
        <span data-testid="header-currency-field"> BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => (
  {
    email: state.user.email,
    expenses: state.wallet.expenses,
  });

export default connect(mapStateToProps)(Header);

Header.defaultProps = {
  email: localStorage.getItem('email') || '',
};

Header.propTypes = {
  email: PropTypes.string,
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
        }),
      }),
    }),
  ).isRequired,
};
