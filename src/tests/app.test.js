import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const emailInput = 'email-input';
const passWordInput = 'password-input';
const myEmail = 'emailDeTeste@trybe.com';
const myPassword = '123456';

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
