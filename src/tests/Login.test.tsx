import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import RecipesAppProvider from '../context/user-provider';

describe('Testando a pagina de Login', () => {
  test('Renderiza o input email', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const inputEmail = screen.getAllByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
  });

  test('Renderiza o input password', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const inputPassword = screen.getAllByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();
  });

  test('Renderiza o botão entrar', () => {
    render(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    const buttonEntrar = screen.getAllByTestId('login-submit-btn');
    expect(buttonEntrar).toBeInTheDocument();
  });
});
