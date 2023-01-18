import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Carteira extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default connect()(Carteira);
