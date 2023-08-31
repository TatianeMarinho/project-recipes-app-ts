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
import initialDrinkMock from './helpers/initialDrinkMock';
import drinkCategoriesMock from './helpers/drinkCategoriesMock';
import initialFoodMock from './helpers/initialFoodMock';
import foodCategoriesMock from './helpers/foodCategoriesMock';
import fetchMock from './helpers/fetchMock';

const searchInputTestID = 'search-input';
const ingredientInputTestID = 'ingredient-search-radio';
const nameInputTestID = 'name-search-radio';
const firstLetterInputTestID = 'first-letter-search-radio';

describe('Verifica barra de busca', () => {

  beforeEach(() => {
    global.fetch = vi.fn(fetchMock)
  })

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
    await waitFor(() => expect(screen.getByText('Recipes details 52771')).toBeInTheDocument());
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

    await userEvent.click(ingredientInput);
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Banana Cantaloupe Smoothie');

    await userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(3);
    await waitFor(() => expect(screen.getByText('Recipes details 12708')).toBeInTheDocument());
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
    await userEvent.type(searchInput, 'Banana Cantaloupe Smoothie');

    await userEvent.click(searchButton);

    expect(global.fetch).toBeCalledTimes(3);
    initialDrinkMock.drinks.forEach((drink, index) => {
      if (index <= 11) {
        const recipeCard = screen.getByTestId(`${index}-recipe-card`);
        expect(recipeCard).toHaveTextContent(drink.strDrink);
      } else {
        const recipeCard = screen.queryByTestId(`${index}-recipe-card`);
        expect(recipeCard).toBeNull();
      }
    });
  });
});
