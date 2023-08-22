import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RecipesAppProvider from '../context/user-provider';

describe('Testando a pagina de Login', () => {
  test('Renderiza o input email', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
  });

  test('Renderiza o input password', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });

  test('Renderiza o botão entrar', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const buttonEntrar = screen.getByTestId('login-submit-btn');
    expect(buttonEntrar).toBeInTheDocument();
  });

  test('Testa se o botão Enter está desabilitado com os campos vazios', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const buttonEntrar = screen.getByTestId('login-submit-btn');
    expect(buttonEntrar).toBeDisabled();
  });

  test('Testa se o botão Enter está habilitado com os campos preenchidos corretamente', async () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEntrar = screen.getByTestId('login-submit-btn');

    await userEvent.type(inputEmail, 'valid@email.com');
    await userEvent.type(inputPassword, '7charpsd');
    expect(buttonEntrar).toBeEnabled();
  });

  test('Testa se o botão Enter está desabilitado com email inválido', async () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEntrar = screen.getByTestId('login-submit-btn');

    await userEvent.type(inputEmail, 'invalidemail.com');
    await userEvent.type(inputPassword, '7charpsd');
    expect(buttonEntrar).toBeDisabled();
  });

  test('Testa se o botão Enter está desabilitado com senha inválida', async () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEntrar = screen.getByTestId('login-submit-btn');

    await userEvent.type(inputEmail, 'valid@email.com');
    await userEvent.type(inputPassword, '6chpsd');
    expect(buttonEntrar).toBeDisabled();
  });
});
