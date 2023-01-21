import React from 'react';
import { findByTestId, getByPlaceholderText, getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndReduxTest, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
// import mocksState from './helpers/mockState';

const carteiraRoute = '/carteira';
const myEmail = 'emailTeste@Trybe.com';
const myPassword = '123456';

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
    const { history } = renderWithRouterAndReduxTest(<App />);
    const emailInput = 'email-input';
    const passWordInput = 'password-input';

    const mockEmail = 'emailTeste@Trybe.com';
    // const myPassword = '123456';

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
  test.only('04 - Verificar se as despesas sao somadas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = 'email-input';
    const passWordInput = 'password-input';

    const campoEmail = screen.getByTestId(emailInput);
    const campoSenha = screen.getByTestId(passWordInput);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(campoSenha, myPassword);
    userEvent.type(campoEmail, myEmail);
    userEvent.click(buttonEnter);
    expect(history.location.pathname).toBe('/carteira');

    const campoValor = screen.getByTestId('value-input');
    const campoDescricao = screen.getByTestId('description-input');
    const addbutton = screen.getByRole('button', { name: /adicionar despesa/i });
    const totalValue = screen.getByTestId('total-field');
    userEvent.type(campoValor, '1');
    userEvent.type(campoDescricao, 'Bala');
    userEvent.click(addbutton);
    await waitFor(() => { expect(totalValue).toHaveTextContent('5.21'); });

    // // act(() => { history.push('/carteira'); });
    // // expect(history.location.pathname).toBe('/carteira');
    // // screen.debug();

    // const campoValor = screen.getByTestId('value-input');
    // const campoDescricao = screen.getByTestId('description-input');
    // const addbutton = screen.getByRole('button', { name: /adicionar despesa/i });
    // const totalValue = screen.getByTestId('total-field');
    // userEvent.type(campoValor, '1');
    // userEvent.type(campoDescricao, 'Bala');
    // userEvent.click(addbutton);
    // // expect(totalValue).toHaveTextContent('5.21');
  });
});

// test('03 - Verificar os elementos do Header com estado mockado', async () => {
//   renderWithRouterAndReduxTest(<App />, stateMock, carteiraRoute);
//   // screen.debug();

//   // const currencies = screen.getByRole('columnheader', { name: /câmbio utilizado/i });

//   await waitFor(() => {
//     const currencies = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
//     expect(currencies.childElementCount).toBe(15);
//   });

//   const headerProfile = await screen.findByTestId('email-field');
//   expect(headerProfile).toHaveTextContent(mockEmail);

//   const headerTotalValue = await screen.findByTestId('total-field');
//   expect(headerTotalValue).toHaveTextContent('221256.48');
// });
// });
