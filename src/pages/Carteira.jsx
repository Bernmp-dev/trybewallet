import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

class Carteira extends React.Component {
  render() {
    const { idToEdit, editor } = this.props;
    return (
      <div>
        <Header />
        {editor ?  <EditForm /> : <WalletForm />}
        <Table />
      </div>
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

export default connect(mapStateToProps)(Carteira);
