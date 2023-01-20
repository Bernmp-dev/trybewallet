import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndReduxTest, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const carteiraRoute = '/carteira';

describe('Testes para a página de Carteira', () => {
  test('01 - Verificar a rota da página de Carteira', () => {
    const { history } = (
      renderWithRouterAndReduxTest(<App />, {}, carteiraRoute));
    expect(history.location.pathname).toBe('/carteira');
  });
  test('02 - Verificar os elementos do Header com estado inicial', () => {
    renderWithRouterAndReduxTest(<App />, {}, carteiraRoute);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const headerProfile = screen.getByTestId('email-field');
    expect(headerProfile).toHaveTextContent('');

    const headerTotalValue = screen.getByTestId('total-field');
    expect(headerTotalValue).toHaveTextContent('0.00');

    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
    expect(currency).toHaveTextContent('BRL');
  });
  test('03 - Verificar se o Email esta presente no Header', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = 'email-input';
    const passWordInput = 'password-input';

    const mockEmail = 'emailTeste@Trybe.com';
    const myPassword = '123456';

    const campoEmail = screen.getByTestId(emailInput);
    const campoSenha = screen.getByTestId(passWordInput);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(campoEmail, mockEmail);
    userEvent.type(campoSenha, myPassword);
    userEvent.click(buttonEnter);
    expect(history.location.pathname).toBe('/carteira');

    const headerProfile = screen.getByTestId('email-field');
    expect(headerProfile).toBeInTheDocument();
    expect(headerProfile).toHaveTextContent(mockEmail);
  });
});
