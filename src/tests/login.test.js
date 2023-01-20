import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const emailInput = 'email-input';
const passWordInput = 'password-input';
const myEmail = 'emailDeTeste@trybe.com';
const myPassword = '123456';

describe('Testes para tela de Login', () => {
  test('Verificar a rota de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  test('Verificar o campo de nome e senha', () => {
    renderWithRouterAndRedux(<App />);
    const campoEmail = screen.getByTestId(emailInput);
    const campoSenha = screen.getByTestId(passWordInput);
    expect(campoEmail).toBeInTheDocument();
    expect(campoSenha).toBeInTheDocument();
  });
  test('Verificar se os campos estao sendo preenchidos corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const campoEmail = screen.getByTestId(emailInput);
    const campoSenha = screen.getByTestId(passWordInput);

    expect(campoSenha).toHaveValue('');
    expect(campoEmail).toHaveValue('');
    expect(campoSenha).toHaveAttribute('placeholder', 'Senha');
    expect(campoEmail).toHaveAttribute('placeholder', 'trybe@trybe.com');
    userEvent.type(campoSenha, myPassword);
    userEvent.type(campoEmail, myEmail);
    expect(campoSenha).toHaveValue(myPassword);
    expect(campoEmail).toHaveValue(myEmail);
  });
  test('Verifica a existência do button Entrar e se está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEnter).toBeInTheDocument();
    expect(buttonEnter).toBeDisabled();
  });
  test('Verifica se o preenchimento dos campos habilita o button "Entrar"', () => {
    renderWithRouterAndRedux(<App />);
    const campoEmail = screen.getByTestId(emailInput);
    const campoSenha = screen.getByTestId(passWordInput);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i });

    expect(buttonEnter).toBeDisabled();
    userEvent.type(campoSenha, myPassword);
    userEvent.type(campoEmail, myEmail);
    expect(buttonEnter).not.toBeDisabled();
  });
  test('Verifica a rota do button "Entrar"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    const campoEmail = screen.getByTestId(emailInput);
    const campoSenha = screen.getByTestId(passWordInput);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(campoSenha, myPassword);
    userEvent.type(campoEmail, myEmail);

    userEvent.click(buttonEnter);
    expect(history.location.pathname).toBe('/carteira');
  });
});
