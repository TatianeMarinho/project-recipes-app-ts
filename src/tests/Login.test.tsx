import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RecipesAppProvider from '../context/user-provider';

const emailInputTestId = 'email-input';
const passwordInputTestId = 'password-input';
const buttonEnterTestId = 'login-submit-btn';

describe('Testando a pagina de Login', () => {
  test('Renderiza o input email', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const inputEmail = screen.getByTestId(emailInputTestId);
    expect(inputEmail).toBeInTheDocument();
  });

  test('Renderiza o input password', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const inputPassword = screen.getByTestId(passwordInputTestId);
    expect(inputPassword).toBeInTheDocument();
  });

  test('Renderiza o botão entrar', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const buttonEntrar = screen.getByTestId(buttonEnterTestId);
    expect(buttonEntrar).toBeInTheDocument();
  });

  test('Testa se o botão Enter está desabilitado com os campos vazios', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const buttonEntrar = screen.getByTestId(buttonEnterTestId);
    expect(buttonEntrar).toBeDisabled();
  });

  test('Testa se o botão Enter está habilitado com os campos preenchidos corretamente', async () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    const inputEmail = screen.getByTestId(emailInputTestId);
    const inputPassword = screen.getByTestId(passwordInputTestId);
    const buttonEntrar = screen.getByTestId(buttonEnterTestId);

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
    const inputEmail = screen.getByTestId(emailInputTestId);
    const inputPassword = screen.getByTestId(passwordInputTestId);
    const buttonEntrar = screen.getByTestId(buttonEnterTestId);

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
    const inputEmail = screen.getByTestId(emailInputTestId);
    const inputPassword = screen.getByTestId(passwordInputTestId);
    const buttonEntrar = screen.getByTestId(buttonEnterTestId);

    await userEvent.type(inputEmail, 'valid@email.com');
    await userEvent.type(inputPassword, '6chpsd');
    expect(buttonEntrar).toBeDisabled();
  });
});
