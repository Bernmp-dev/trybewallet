import React, { Component } from 'react';
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
    return (
      <header>
        <h1 data-testid="email-field">{email}</h1>
        <h1 data-testid="total-field">0</h1>
        <h1 data-testid="header-currency-field">BRL</h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => (
  { email: state.user.email });

export default connect(mapStateToProps)(Header);
