import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

describe('Verifica se o componente Header é renderizado corretamente', () => {
  test.only('Verifica se há um h1 com o título da página', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const pageTitle = screen.getByRole('heading');
    expect(pageTitle).toBe(/meals/i);
  });
  test('Verifica se há o ícone com a imagem do perfil', () => {
    renderWithRouter(<App />);
    const profileImg = screen.getByRole('img', { name: /icone de perfil/i });
    expect(profileImg).toHaveAttribute('src', profileIcon);
  });
  test('Verifica se há o ícone com a imagem do perfil', () => {
    renderWithRouter(<App />);
    const searchImg = screen.getByRole('img', { name: /icone de pesquisa/i });
    expect(searchImg).toHaveAttribute('src', searchIcon);
  });
});
