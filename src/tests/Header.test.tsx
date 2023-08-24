import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

const PAGETITLE = 'page-title';

describe('Verifica se o componente Header é renderizado corretamente', () => {
  test('Verifica a renderizaçao do Header no /meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const pageTitle = screen.getByTestId(PAGETITLE);
    expect(pageTitle).toHaveTextContent('Meals');

    const profileImg = screen.getByRole('img', { name: /icone de perfil/i });
    expect(profileImg).toHaveAttribute('src', profileIcon);

    const searchImg = screen.getByRole('img', { name: /icone de pesquisa/i });
    expect(searchImg).toHaveAttribute('src', searchIcon);

    const btnProfile = screen.getByRole('button', { name: /icone de perfil/i });
    expect(btnProfile).toBeInTheDocument();

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    await userEvent.click(btnSearch);

    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();

    await userEvent.click(btnSearch);

    expect(searchBar).not.toBeInTheDocument();

    await userEvent.click(btnProfile);

    const titleProfile = screen.getByTestId(PAGETITLE);
    expect(titleProfile).toBeInTheDocument();
  });

  test('Verifica a renderizaçao do Header no /done-recipes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    const pageTitle = screen.getByRole('heading', { name: /done recipes/i });
    expect(pageTitle).toBeInTheDocument();

    const profileImg = screen.getByRole('img', { name: /icone de perfil/i });
    expect(profileImg).toHaveAttribute('src', profileIcon);

    const btn = screen.getByRole('button', { name: /icone de perfil/i });
    expect(btn).toBeInTheDocument();

    await userEvent.click(btn);

    const titleProfile = screen.getByTestId(PAGETITLE);
    expect(titleProfile).toBeInTheDocument();
  });

  test('Verifica a renderizaçao do Header no /drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const searchImg = screen.getByRole('img', { name: /icone de pesquisa/i });
    expect(searchImg).toHaveAttribute('src', searchIcon);

    const profileImg = screen.getByRole('img', { name: /icone de perfil/i });
    expect(profileImg).toHaveAttribute('src', profileIcon);

    const btnProfile = screen.getByRole('button', { name: /icone de perfil/i });
    expect(btnProfile).toBeInTheDocument();

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    await userEvent.click(btnSearch);

    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();

    await userEvent.click(btnSearch);

    expect(searchBar).not.toBeInTheDocument();

    await userEvent.click(btnProfile);

    const titleProfile = screen.getByTestId(PAGETITLE);
    expect(titleProfile).toBeInTheDocument();
  });

  test('Verifica a renderizaçao do Header no /favorite-recipes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });

    const pageTitle = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(pageTitle).toBeInTheDocument();

    const profileImg = screen.getByRole('img', { name: /icone de perfil/i });
    expect(profileImg).toHaveAttribute('src', profileIcon);

    const btnProfile = screen.getByRole('button', { name: /icone de perfil/i });
    expect(btnProfile).toBeInTheDocument();

    await userEvent.click(btnProfile);

    const titleProfile = screen.getByTestId(PAGETITLE);
    expect(titleProfile).toBeInTheDocument();
  });

  test('Verifica a renderizaçao do Header no /Profile', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const titleProfile = screen.getByTestId(PAGETITLE);
    expect(titleProfile).toBeInTheDocument();

    const profileImg = screen.getByRole('img', { name: /icone de perfil/i });
    expect(profileImg).toHaveAttribute('src', profileIcon);

    const btnProfile = screen.getByRole('button', { name: /icone de perfil/i });
    expect(btnProfile).toBeInTheDocument();

    await userEvent.click(btnProfile);
    expect(titleProfile).toBeInTheDocument();
  });
});
