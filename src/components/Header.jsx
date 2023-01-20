import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    email: '',
  };

  componentDidMount() {
    const storedEmail = localStorage.getItem('email');
    this.setState({ email: storedEmail });
  }

  render() {
    const { email } = this.state;
    const { expenses } = this.props;

    const result = expenses.reduce((acc, curr) => {
      acc += curr.value * curr.exchangeRates[curr.currency].ask;
      return acc;
    }, 0);
    const renderExpenses = parseFloat(result.toFixed(2));

    const fix = (number) => Number(number).toFixed(2);

    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <br />
        <span data-testid="total-field">{fix(renderExpenses)}</span>
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
  expenses: {},
};

Header.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }),
  ),
};
