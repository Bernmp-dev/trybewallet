import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const myEmail = 'emailTeste@Trybe.com';
const myPassword = '123456';
const emailInput = 'email-input';
const passWordInput = 'password-input';

describe('Testes para a página de Carteira', () => {
  test('01 - Verificar a rota da página de Carteira', () => {
    const { history } = (renderWithRouterAndRedux(<App />));

    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');
  });

  test('02 - Verificar os elementos do Header com estado inicial', () => {
    const { history } = (renderWithRouterAndRedux(<App />));

    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');

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

    const campoEmail = screen.getByTestId(emailInput);
    const campoSenha = screen.getByTestId(passWordInput);
    const buttonEnter = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(campoEmail, myEmail);
    userEvent.type(campoSenha, myPassword);
    userEvent.click(buttonEnter);
    expect(history.location.pathname).toBe('/carteira');

    const headerProfile = screen.getByTestId('email-field');
    expect(headerProfile).toBeInTheDocument();
    expect(headerProfile).toHaveTextContent(myEmail);
  });
  test('04 - Verificar se as despesas sao somadas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');

    const campoValor = screen.getByTestId('value-input');
    const campoDescricao = screen.getByTestId('description-input');
    const addbutton = screen.getByRole('button', { name: /adicionar despesa/i });
    const totalValue = screen.getByTestId('total-field');

    userEvent.type(campoValor, '1');
    userEvent.type(campoDescricao, 'Bala');
    userEvent.click(addbutton);
    await waitFor(() => { expect(totalValue).toHaveTextContent('5.21'); });
  });
});
