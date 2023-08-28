import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import firstLetter from './helpers/firstLetterMock';
import nameMock from './helpers/nameMock';
import ingredientMock from './helpers/ingredientMock';
import ingredientDrinkMock from './helpers/ingredientDrinkMock';
import nameDrinkMock from './helpers/nameDrinkMock';

const searchInputTestID = 'search-input';
const ingredientInputTestID = 'ingredient-search-radio';
const nameInputTestID = 'name-search-radio';
const firstLetterInputTestID = 'first-letter-search-radio';

describe('Verifica barra de busca', () => {
  test('Verifica pesquisa de comida por primeira letra', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (firstLetter),
    });
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    await userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(searchInputTestID);
    const ingredienteInput = screen.getByTestId(ingredientInputTestID);
    const nameInput = screen.getByTestId(nameInputTestID);
    const firstLetterInput = screen.getByTestId(firstLetterInputTestID);
    const searchButton = screen.getByRole('button', { name: /SEARCH/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredienteInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firstLetterInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await userEvent.click(firstLetterInput);
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'a');

    expect(firstLetterInput).toBeChecked();
    expect(searchInput).toHaveValue('a');

    await userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(1);
    await screen.findByText(/Apple Frangipan Tart/i);
    await screen.findByText(/Apple & Blackberry Crumble/i);
    await screen.findByText(/Apam balik/i);
    await screen.findByText(/Ayam Percik/i);
  });

  test('Testa pesquisa de comida por nome', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (nameMock),
    });
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    await userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(searchInputTestID);
    const ingredienteInput = screen.getByTestId(ingredientInputTestID);
    const nameInput = screen.getByTestId(nameInputTestID);
    const firstLetterInput = screen.getByTestId(firstLetterInputTestID);
    const searchButton = screen.getByRole('button', { name: /SEARCH/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredienteInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firstLetterInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await userEvent.click(nameInput);
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Arrabiata');

    await userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(1);
    await waitFor(() => expect(screen.getByText('Recipes details 52771')).toBeInTheDocument());
  });

  test('Testa pesquisa de comida por ingrediente', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (ingredientMock),
    });
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    await userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(searchInputTestID);
    const ingredientInput = screen.getByTestId(ingredientInputTestID);
    const nameInput = screen.getByTestId(nameInputTestID);
    const firstLetterInput = screen.getByTestId(firstLetterInputTestID);
    const searchButton = screen.getByRole('button', { name: /SEARCH/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firstLetterInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await userEvent.click(ingredientInput);
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Oregano');

    await userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(1);
    await screen.findByText(/Braised Beef Chilli/i);
    await screen.findByText(/Pizza Express Margherita/i);
  });

  test('Testa pesquisa de drink por ingrediente', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (ingredientDrinkMock),
    });
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    await userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(searchInputTestID);
    const ingredientInput = screen.getByTestId(ingredientInputTestID);
    const nameInput = screen.getByTestId(nameInputTestID);
    const firstLetterInput = screen.getByTestId(firstLetterInputTestID);
    const searchButton = screen.getByRole('button', { name: /SEARCH/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firstLetterInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await userEvent.click(ingredientInput);
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Banana');

    await userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(1);
    ingredientDrinkMock.drinks.forEach((drinkRecipe) => {
      expect(screen.getByText(drinkRecipe.strDrink)).toBeInTheDocument();
    });
  });
  test('Testa se o usuário é direcionado para tela de detalhes da receita se'
    + 'uma única receita for encontrada.', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (nameDrinkMock),
    });
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    await userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(searchInputTestID);
    const ingredientInput = screen.getByTestId(ingredientInputTestID);
    const nameInput = screen.getByTestId(nameInputTestID);
    const firstLetterInput = screen.getByTestId(firstLetterInputTestID);
    const searchButton = screen.getByRole('button', { name: /SEARCH/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firstLetterInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await userEvent.click(ingredientInput);
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Banana Cantaloupe Smoothie');

    await userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(1);
    await waitFor(() => expect(screen.getByText('Recipes details 12708')).toBeInTheDocument());
  });
  test('Testa se nada é renderizado se a API retorna null', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (null),
    });
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    await userEvent.click(btnSearch);

    const searchInput = screen.getByTestId(searchInputTestID);
    const ingredientInput = screen.getByTestId(ingredientInputTestID);
    const nameInput = screen.getByTestId(nameInputTestID);
    const firstLetterInput = screen.getByTestId(firstLetterInputTestID);
    const searchButton = screen.getByRole('button', { name: /SEARCH/i });

    expect(searchInput).toBeInTheDocument();
    expect(ingredientInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(firstLetterInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await userEvent.click(ingredientInput);
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Banana Cantaloupe Smoothie');

    await userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(1);
    const recipeCards = screen.queryByTestId('0-recipe-card');
    expect(recipeCards).toBeNull();
  });
});
