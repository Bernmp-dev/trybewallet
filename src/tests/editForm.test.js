import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

// const emailInput = 'email-input';
// const passWordInput = 'password-input';
// const myEmail = 'emailDeTeste@trybe.com';
// const myPassword = '123456';

describe('Testes para inputs do "EditForm"', () => {
  test('Testar se iputs estao no documento', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/carteira'); });
    expect(history.location.pathname).toBe('/carteira');

    const campoValor = screen.getByPlaceholderText('Valor');
    const campoDescricao = screen.getByPlaceholderText('Descrição');

    const addbutton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(campoValor, '1');
    userEvent.type(campoDescricao, 'Bala');
    userEvent.click(addbutton);

    await waitFor(() => {
      const editButton = screen.getAllByTestId('edit-btn');
      userEvent.click(editButton[0]);
    });

    const editValue = screen.getByTestId('value-input');
    const editDescri = screen.getByTestId('description-input');
    const editCurrency = screen.getByTestId('currency-input');
    const editMethod = screen.getByTestId('method-input');
    const editTag = screen.getByTestId('tag-input');
    const endEdit = screen.getByRole('button', { name: /editar despesa/i });

    expect(editValue).toBeInTheDocument();
    expect(editDescri).toBeInTheDocument();
    expect(editCurrency).toBeInTheDocument();
    expect(editMethod).toBeInTheDocument();
    expect(editTag).toBeInTheDocument();
    expect(endEdit).toBeInTheDocument();

    userEvent.clear(editValue);
    userEvent.clear(editDescri);
    userEvent.type(editValue, '2');
    userEvent.type(editDescri, 'Duas Balas');

    await waitFor(() => {
      userEvent.selectOptions(editCurrency, 'BTC');
      userEvent.selectOptions(editMethod, 'Cartão de crédito');
      userEvent.selectOptions(editTag, 'Lazer');
    });

    userEvent.click(endEdit);

    await waitFor(() => {
      const newDesc = screen.getByRole('cell', { name: /duas balas/i });
      const newValue = screen.getByRole('cell', { name: /2\.00/i });
      const newCurr = screen.getByRole('cell', { name: /bitcoin\/real brasileiro/i });
      const newMethod = screen.getByRole('cell', { name: /cartão de crédito/i });
      const newTag = screen.getByRole('cell', { name: /lazer/i });

      expect(newDesc).toBeInTheDocument();
      expect(newValue).toBeInTheDocument();
      expect(newCurr).toBeInTheDocument();
      expect(newMethod).toBeInTheDocument();
      expect(newTag).toBeInTheDocument();
    });
  });
});
