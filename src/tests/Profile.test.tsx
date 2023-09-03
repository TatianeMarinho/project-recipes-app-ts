// import userEvent from '@testing-library/user-event';
// import { screen, waitFor } from '@testing-library/react';
// import { renderWithRouter } from './helpers/renderWith';
// import App from '../App';

// describe('Verifica a página Profile', () => {
//   test('Verifica se o email inserido no login é renderizado na página de perfil', async () => {
//     renderWithRouter(<App />, { initialEntries: ['/profile'] });
//     const emailInput = screen.getByTestId('profile-email');
//     await waitFor(() => expect(emailInput.textContent).toBeInTheDocument());
//   });
//   test('Verifica se há um botão que redireciona para a página Done Recipes', async () => {
//     renderWithRouter(<App />, { initialEntries: ['/profile'] });
//     const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
//     expect(doneRecipesBtn).toBeInTheDocument();
//     await userEvent.click(doneRecipesBtn);
//     expect(window.location.pathname).toBe('/done-recipes');
//   });
//   test('Verifica se há um botão que redireciona para a página Favorite Recipes', async () => {
//     renderWithRouter(<App />, { initialEntries: ['/profile'] });
//     const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
//     await userEvent.click(favoriteRecipesBtn);
//     expect(window.location.pathname).toBe('/favorite-recipes');
//   });
//   test('Verifica se há um botão de logout que redireciona para a tela de Login', async () => {
//     renderWithRouter(<App />, { initialEntries: ['/profile'] });
//     const logoutBtn = screen.getByRole('button', { name: /logout/i });
//     await userEvent.click(logoutBtn);
//     expect(window.location.pathname).toBe('/');
//   });
// });
