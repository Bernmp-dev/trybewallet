import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndReduxTest } from './helpers/renderWith';
import App from '../App';

const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
    data: [],
    editor: false,
    idToEdit: 0,
  },
};

const stateMock = {
  user: {
    email: 'emailTeste@Trybe.com',
  },
  wallet: {
    currencies: ['USD', 'BTC'],
    expenses: [{
      id: 0,
      value: '2000',
      description: 'Apartamento',
      currency: 'BTC',
      method: 'Dinheiro',
      tag: 'Lazer',
    }, {
      id: 2,
      value: '50',
      description: 'Iphone',
      currency: 'EUR',
      method: 'Cartão de crédito',
      tag: 'Saúde',
    }],
    data: [],
    editor: false,
    idToEdit: 0,
  },
};

const { email: mockEmail } = stateMock.user;

const carteiraRoute = '/carteira';

const passWordInput = 'password-input';

const myPassword = '123456';

describe('Testes para a página de Carteira', () => {
  test('01 - Verificar a rota da página de Carteira', () => {
    const { history } = (
      renderWithRouterAndReduxTest(<App />, initialState, carteiraRoute));
    expect(history.location.pathname).toBe('/carteira');
  });
  test('02 - Verificar os elementos do Header com estado inicial', () => {
    renderWithRouterAndReduxTest(<App />, initialState, carteiraRoute);
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
  test('03 - Verificar os elementos do Header com estado mockado', async () => {
    renderWithRouterAndReduxTest(<App />, stateMock, carteiraRoute);
    // screen.debug();

    // const currencies = screen.getByRole('columnheader', { name: /câmbio utilizado/i });

    await waitFor(() => {
      const currencies = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
      expect(currencies.childElementCount).toBe(15);
    });

    const headerProfile = await screen.findByTestId('email-field');
    expect(headerProfile).toHaveTextContent(mockEmail);

    const headerTotalValue = await screen.findByTestId('total-field');
    expect(headerTotalValue).toHaveTextContent('221256.48');
  });
  // test('03 - Verificar os elementos do Header com estado mockado', () => {
  //   const { history } = renderWithRouterAndReduxTest(<App />, stateMock, '/');
  //   const emailInput = 'email-input';
  //   const campoEmail = screen.getByTestId(emailInput);
  //   const campoSenha = screen.getByTestId(passWordInput);
  //   const buttonEnter = screen.getByRole('button', { name: /entrar/i });

  //   userEvent.type(campoEmail, mockEmail);
  //   userEvent.type(campoSenha, myPassword);

  //   userEvent.click(buttonEnter);
  //   expect(history.location.pathname).toBe('/carteira');
  // });
});
