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
    const { convertedValues } = this.props;

    const result = convertedValues.reduce((acc, curr) => acc + curr, 0);
    const renderExpenses = parseFloat(result.toFixed(2));

    return (
      <header>
        <h1 data-testid="email-field">{email}</h1>
        <span data-testid="total-field">{renderExpenses}</span>
        <h1 data-testid="header-currency-field">BRL</h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  convertedValues: state.wallet.convertedValues,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  convertedValues: PropTypes.arrayOf(PropTypes.number).isRequired,
};
