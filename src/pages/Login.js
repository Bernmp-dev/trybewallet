import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions/saveEmail';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
  };

  validateButton = () => {
    const { email, senha } = this.state;
    const minPassLength = 6;
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const checkEmail = pattern.test(email);
    const checkPass = senha.length >= minPassLength;
    return email.length && checkPass && checkEmail;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  enterClickHandle = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;

    dispatch(saveEmail(email));
    localStorage.setItem('email', email);
    history.push('/carteira');
  };

  render() {
    const { email, senha } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            id="email"
            name="email"
            data-testid="email-input"
            placeholder="trybe@trybe.com"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            id="senha"
            name="senha"
            data-testid="password-input"
            placeholder="Senha"
            value={ senha }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ !this.validateButton() }
            onClick={ this.enterClickHandle }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
