import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

class Carteira extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <Header />
        {editor ? <EditForm /> : <WalletForm />}
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    editor: state.wallet.editor,
  });

export default connect(mapStateToProps)(Carteira);

Carteira.propTypes = {
  editor: PropTypes.bool.isRequired,
};
