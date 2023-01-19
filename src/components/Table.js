import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>

          {expenses.map((item, i) => (
            <tr key={ i }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{item.value}</td>
              <td>{item.nameToName}</td>
              <td>{item.ask}</td>
              <td>{parseFloat(item.convertedValue.toFixed(2))}</td>
              <td>Real</td>
              <td>
                <button type="button">editar</button>
                <button type="button">excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => (
  { expenses: state.wallet.expenses2,
  });

export default connect(mapStateToProps)(Table);

Table.defaultProps = {
  expenses: {},
};

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType(
        PropTypes.string,
        PropTypes.number,
      ),
    ),
  ),
};
