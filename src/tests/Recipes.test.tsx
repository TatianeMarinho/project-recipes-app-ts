import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetchMock from './helpers/fetchMock';
import foodCategoriesMock from './helpers/foodCategoriesMock';
import initialFoodMock from './helpers/initialFoodMock';
import drinkCategoriesMock from './helpers/drinkCategoriesMock';
import initialDrinkMock from './helpers/initialDrinkMock';
import foodFilterDessert from './helpers/foodFilterDessert';
import drinkFilterCocoa from './helpers/drinkFilterCocoa';

const allCategoryFilterTestId = 'All-category-filter';

describe('Testa a página Recipes', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(fetchMock);
    window.alert = vi.fn(() => {});
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Testa se todos os botões de filtro aparecem na tela meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    await waitFor(() => screen.findByText('Corba'));
    foodCategoriesMock.meals.forEach(async (category, index) => {
      if (index < 5) {
        await screen.findByRole('button', { name: category.strCategory });
      }
    });
    const btnAll = screen.getByTestId(allCategoryFilterTestId);
    expect(btnAll).toBeInTheDocument();
    await userEvent.click(btnAll);

    const allImages = screen.queryAllByRole('img');
    expect(allImages).toHaveLength(16);

    initialFoodMock.meals.forEach((meal, index) => {
      if (index >= 12) {
        expect(screen.queryByTestId(`${index}-recipe-card`)).toBeNull();
        expect(screen.queryByTestId(`${index}-card-name`)).toBeNull();
        expect(screen.queryByTestId(`${index}-card-img`)).toBeNull();
      } else {
        expect(screen.getByTestId(`${index}-recipe-card`).children)
          .toHaveLength(2);
        expect(screen.getByTestId(`${index}-card-name`))
          .toHaveTextContent(meal.strMeal);
        expect(screen.getByTestId(`${index}-card-img`))
          .toHaveAttribute('src', meal.strMealThumb);
      }
    });
  });
  test('Testa se todos os botões de filtro aparecem na tela drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    waitFor(() => screen.findByText('GG'));
    drinkCategoriesMock.drinks.forEach(async (category, index) => {
      if (index < 5) {
        screen.findByRole('button', { name: category.strCategory });
      }
    });
    const btnAll = screen.getByTestId(allCategoryFilterTestId);
    expect(btnAll).toBeInTheDocument();
    await userEvent.click(btnAll);

    const allImages = screen.queryAllByRole('img');
    expect(allImages).toHaveLength(16);

    initialDrinkMock.drinks.forEach((drink, index) => {
      if (index >= 12) {
        expect(screen.queryByTestId(`${index}-recipe-card`)).toBeNull();
        expect(screen.queryByTestId(`${index}-card-name`)).toBeNull();
        expect(screen.queryByTestId(`${index}-card-img`)).toBeNull();
      } else {
        expect(screen.getByTestId(`${index}-recipe-card`).children)
          .toHaveLength(2);
        expect(screen.getByTestId(`${index}-card-name`))
          .toHaveTextContent(drink.strDrink);
        expect(screen.getByTestId(`${index}-card-img`))
          .toHaveAttribute('src', drink.strDrinkThumb);
      }
    });
  });
  test('Testa o botão de filtro na tela meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    await screen.findByText('Corba');
    foodCategoriesMock.meals.forEach(async (category, index) => {
      if (index < 5) {
        screen.findByRole('button', { name: category.strCategory });
      }
    });
    const btnAll = screen.getByTestId(allCategoryFilterTestId);
    expect(btnAll).toBeInTheDocument();
    await userEvent.click(btnAll);

    const dessertFilterBtn = await screen.findByTestId('Dessert-category-filter');
    await userEvent.click(dessertFilterBtn);

    await screen.findByText('Apam balik');
    foodFilterDessert.meals.forEach((meal, index) => {
      if (index >= 12) {
        expect(screen.queryByTestId(`${index}-recipe-card`)).toBeNull();
        expect(screen.queryByTestId(`${index}-card-name`)).toBeNull();
        expect(screen.queryByTestId(`${index}-card-img`)).toBeNull();
      } else {
        expect(screen.getByTestId(`${index}-recipe-card`).children)
          .toHaveLength(2);
        expect(screen.getByTestId(`${index}-card-name`))
          .toHaveTextContent(meal.strMeal);
        expect(screen.getByTestId(`${index}-card-img`))
          .toHaveAttribute('src', meal.strMealThumb);
      }
    });

    await userEvent.click(dessertFilterBtn);
    await waitFor(() => screen.findByText('Corba'));
  });
  test('Testa o botão de filtro na tela drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    await screen.findByText('GG');
    drinkCategoriesMock.drinks.forEach(async (category, index) => {
      if (index < 5) {
        screen.findByRole('button', { name: category.strCategory });
      }
    });
    const btnAll = screen.getByTestId(allCategoryFilterTestId);
    expect(btnAll).toBeInTheDocument();
    await userEvent.click(btnAll);

    const cocoaFilterButton = await screen.findByTestId('Cocoa-category-filter');
    await userEvent.click(cocoaFilterButton);

    await screen.findByText('Castillian Hot Chocolate');
    drinkFilterCocoa.drinks.forEach((drink, index) => {
      if (index >= 12) {
        expect(screen.queryByTestId(`${index}-recipe-card`)).toBeNull();
        expect(screen.queryByTestId(`${index}-card-name`)).toBeNull();
        expect(screen.queryByTestId(`${index}-card-img`)).toBeNull();
      } else {
        expect(screen.getByTestId(`${index}-recipe-card`).children)
          .toHaveLength(2);
        expect(screen.getByTestId(`${index}-card-name`))
          .toHaveTextContent(drink.strDrink);
        expect(screen.getByTestId(`${index}-card-img`))
          .toHaveAttribute('src', drink.strDrinkThumb);
      }
    });

    await userEvent.click(cocoaFilterButton);
    await waitFor(() => screen.findByText('GG'));
  });
  test('User is redirected to recipe details if a food recipe is clicked', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    await screen.findByText('Corba');
    const firstRecipe = await screen.findByTestId('0-card-name');
    expect(firstRecipe).toHaveTextContent('Corba');
    await userEvent.click(firstRecipe);
    const corbaCategory = await screen.findByTestId('recipe-category');
    expect(corbaCategory).toHaveTextContent('Category: Side');
  });
  test('User is redirected to recipe details if a drink recipe is clicked', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    await screen.findByText('GG');
    const firstRecipe = await screen.findByTestId('0-card-name');
    expect(firstRecipe).toHaveTextContent('GG');
    await userEvent.click(firstRecipe);
    const ggCategory = await screen.findByTestId('recipe-category');
    expect(ggCategory).toHaveTextContent('Optional alcohol');
  });
});
