import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

// const carteiraRoute = '/carteira';
// const myEmail = 'emailTeste@Trybe.com';
// const myPassword = '123456';
// const emailInput = 'email-input';
// const passWordInput = 'password-input';

describe('Testes para a página de Carteira', () => {
  test('01 - Verificar se a edicao funciona da forma correta', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');

    const editValue = screen.getByTestId('value-input');
    const editDescri = screen.getByTestId('description-input');
    const editCurrency = screen.getByTestId('currency-input');
    const editMethod = screen.getByTestId('method-input');
    const editTag = screen.getByTestId('tag-input');
    const addbutton = screen.getByRole('button', { name: /adicionar despesa/i });
    const totalValue = screen.getByTestId('total-field');

    userEvent.type(editValue, '1');
    userEvent.type(editDescri, 'Bala');

    await waitFor(() => {
      userEvent.selectOptions(editCurrency, 'USD');
      userEvent.selectOptions(editMethod, 'Cartão de débito');
      userEvent.selectOptions(editTag, 'Transporte');
    });
    userEvent.click(addbutton);

    await waitFor(() => {
      const editButton = screen.getAllByTestId('edit-btn');
      userEvent.click(editButton[0]);
    });

    userEvent.clear(editValue);
    userEvent.clear(editDescri);
    userEvent.type(editValue, '2');
    userEvent.type(editDescri, 'Duas Balas');
    const endEdit = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(endEdit);

    await waitFor(() => {
      expect(endEdit).not.toBeInTheDocument();
      expect(totalValue).toHaveTextContent('5.21');
    });
    await waitFor(() => {
      const delButton = screen.getAllByTestId('delete-btn');
      userEvent.click(delButton[0]);
      expect(delButton[0]).not.toBeInTheDocument();
      expect(totalValue).toHaveTextContent('0.0');
    });
  });
  test('02 - currencis fetch', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');

    const addbutton = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addbutton);

    const currenciesSelect = screen.getByTestId('currency-input');
    await waitFor(() => {
      expect(currenciesSelect.childElementCount).toBe(15);
    });
  });
  test('03 - Verificar se o botao excluir funciona de maneira correta', async () => {
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

    await waitFor(() => {
      expect(totalValue).toHaveTextContent('5.21');
    });

    await waitFor(() => {
      const delButton2 = screen.getAllByTestId('delete-btn');
      userEvent.click(delButton2[0]);
      expect(delButton2[0]).not.toBeInTheDocument();
      expect(totalValue).toHaveTextContent('0.0');
    });
  });
});
