import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

const emailInputTestId = 'email-input';
const passwordInputTestId = 'password-input';
const buttonEnterTestId = 'login-submit-btn';

describe('Testando a pagina de Login', () => {
  test('Renderiza o input email', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(emailInputTestId);
    expect(inputEmail).toBeInTheDocument();
  });

  test('Renderiza o input password', () => {
    renderWithRouter(<App />);

    const inputPassword = screen.getByTestId(passwordInputTestId);
    expect(inputPassword).toBeInTheDocument();
  });

  test('Renderiza o botão entrar', () => {
    renderWithRouter(<App />);

    const buttonEntrar = screen.getByTestId(buttonEnterTestId);
    expect(buttonEntrar).toBeInTheDocument();
  });

  test('Testa se o botão Enter está desabilitado com os campos vazios', () => {
    renderWithRouter(<App />);

    const buttonEntrar = screen.getByTestId(buttonEnterTestId);
    expect(buttonEntrar).toBeDisabled();
  });

  test('Testa se o botão Enter está habilitado com os campos preenchidos corretamente', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(emailInputTestId);
    const inputPassword = screen.getByTestId(passwordInputTestId);
    const buttonEntrar = screen.getByTestId(buttonEnterTestId);

    await userEvent.type(inputEmail, 'valid@email.com');
    await userEvent.type(inputPassword, '7charpsd');
    expect(buttonEntrar).toBeEnabled();
  });

  test('Testa se o botão Enter está desabilitado com email inválido', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(emailInputTestId);
    const inputPassword = screen.getByTestId(passwordInputTestId);
    const buttonEntrar = screen.getByTestId(buttonEnterTestId);

    await userEvent.type(inputEmail, 'invalidemail.com');
    await userEvent.type(inputPassword, '7charpsd');
    expect(buttonEntrar).toBeDisabled();
  });

  test('Testa se o botão Enter está desabilitado com senha inválida', async () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(emailInputTestId);
    const inputPassword = screen.getByTestId(passwordInputTestId);
    const buttonEntrar = screen.getByTestId(buttonEnterTestId);

    await userEvent.type(inputEmail, 'valid@email.com');
    await userEvent.type(inputPassword, '6chpsd');
    expect(buttonEntrar).toBeDisabled();
    console.log('vai passar esse teste?');
  });
});
