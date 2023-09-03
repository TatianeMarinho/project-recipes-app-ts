import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Verifica a página Profile', () => {
  test('Verifica se o email inserido no login é renderizado na página de perfil', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const emailInput = screen.getByTestId('profile-email');
    expect(emailInput).toBeInTheDocument();
  });
  test('Verifica se há um botão que redireciona para a página Done Recipes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    expect(doneRecipesBtn).toBeInTheDocument();
    await userEvent.click(doneRecipesBtn);
    const doneRecipesTitle = screen.getByRole('heading', { name: /done recipes/i });
    expect(doneRecipesTitle).toBeInTheDocument();
  });
  test('Verifica se há um botão que redireciona para a página Favorite Recipes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
    await userEvent.click(favoriteRecipesBtn);
    const favoriteRecipesTitle = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(favoriteRecipesTitle).toBeInTheDocument();
  });
  test('Verifica se há um botão de logout que redireciona para a tela de Login', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    await userEvent.click(logoutBtn);
    expect(window.location.pathname).toBe('/');
  });
});
