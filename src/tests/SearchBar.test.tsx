import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import ingredientDrinkMock from './helpers/ingredientDrinkMock';
import fetchMock from './helpers/fetchMock';

const searchInputTestID = 'search-input';
const ingredientInputTestID = 'ingredient-search-radio';
const nameInputTestID = 'name-search-radio';
const firstLetterInputTestID = 'first-letter-search-radio';
const banana = 'Banana Cantaloupe Smoothie';

describe('Verifica barra de busca', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(fetchMock);
    window.alert = vi.fn(() => {});
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Verifica pesquisa de comida por primeira letra', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(2);

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

    expect(global.fetch).toBeCalledTimes(3);
    await screen.findByText(/Apple Frangipan Tart/i);
    await screen.findByText(/Apple & Blackberry Crumble/i);
    await screen.findByText(/Apam balik/i);
    await screen.findByText(/Ayam Percik/i);
  });

  test('Testa pesquisa de comida por nome', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(2);

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

    expect(global.fetch).toBeCalledTimes(3);
    await waitFor(() => expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument());
  });

  test('Testa pesquisa de comida por ingrediente', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(2);

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

    expect(global.fetch).toBeCalledTimes(3);
    await screen.findByText(/Braised Beef Chilli/i);
    await screen.findByText(/Pizza Express Margherita/i);
  });

  test('Testa pesquisa de drink por ingrediente', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(2);

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

    expect(global.fetch).toBeCalledTimes(3);
    ingredientDrinkMock.drinks.forEach((drinkRecipe) => {
      expect(screen.getByText(drinkRecipe.strDrink)).toBeInTheDocument();
    });
  });
  test('Testa se o usuário é direcionado para tela de detalhes da receita se'
    + 'uma única receita for encontrada.', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(2);

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

    await userEvent.click(nameInput);
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, banana);

    await userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(3);
    await waitFor(() => expect(screen.getByText(banana)).toBeInTheDocument());
  });
  test('Testa se nada é modificado se a API retorna null', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    expect(global.fetch).toBeCalledTimes(2);

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
    await userEvent.type(searchInput, banana);

    await userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(3);
    const recipeCard = screen.queryByTestId('0-recipe-card');
    expect(recipeCard).toBeNull();
  });
});
