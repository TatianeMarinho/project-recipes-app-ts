import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { PAGETITLE } from '../types/types';
import { renderWithRouter } from './helpers/renderWith';

const drinks = 'drinks-bottom-btn';
const meals = 'meals-bottom-btn';

describe('Verifica se o componente Footer é renderizado corretamente', () => {
  test('Verifica a renderizaçao do Footer no /meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const pageTitle = screen.getByTestId(PAGETITLE);
    expect(pageTitle).toHaveTextContent('Meals');

    const drinksIcon = screen.getByTestId(drinks);
    expect(drinksIcon).toBeInTheDocument();

    const mealsIcon = screen.getByTestId(meals);
    expect(mealsIcon).toBeInTheDocument();

    await userEvent.click(drinksIcon);

    const pageTitleNew = screen.getByTestId(PAGETITLE);
    expect(pageTitleNew).toHaveTextContent('Drinks');
  });

  test('Verifica a renderizaçao do Footer no /drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const pageTitle = screen.getByTestId(PAGETITLE);
    expect(pageTitle).toHaveTextContent('Drinks');

    const drinksIcon = screen.getByTestId(drinks);
    expect(drinksIcon).toBeInTheDocument();

    const mealsIcon = screen.getByTestId(meals);
    expect(mealsIcon).toBeInTheDocument();

    await userEvent.click(mealsIcon);

    const pageTitleNew = screen.getByTestId(PAGETITLE);
    expect(pageTitleNew).toHaveTextContent('Meals');
  });

  test('Verifica a renderizaçao do Footer no /done-recipes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    const pageTitle = screen.getByRole('heading', { name: /done recipes/i });
    expect(pageTitle).toBeInTheDocument();

    const drinksIcon = screen.getByTestId(drinks);
    expect(drinksIcon).toBeInTheDocument();

    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();

    await userEvent.click(mealsIcon);

    const pageTitleNew = screen.getByTestId(PAGETITLE);
    expect(pageTitleNew).toHaveTextContent('Meals');
  });

  test('Verifica a renderizaçao do Footer no /favorite-recipes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });

    const pageTitle = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(pageTitle).toBeInTheDocument();

    const drinksIcon = screen.getByTestId(drinks);
    expect(drinksIcon).toBeInTheDocument();

    const mealsIcon = screen.getByTestId(meals);
    expect(mealsIcon).toBeInTheDocument();

    await userEvent.click(drinksIcon);

    const pageTitleNew = screen.getByTestId(PAGETITLE);
    expect(pageTitleNew).toHaveTextContent('Drinks');
  });

  test('Verifica a renderizaçao do Footer no /Profile', async () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const titleProfile = screen.getByTestId(PAGETITLE);
    expect(titleProfile).toBeInTheDocument();

    const drinksIcon = screen.getByTestId(drinks);
    expect(drinksIcon).toBeInTheDocument();

    const mealsIcon = screen.getByTestId(meals);
    expect(mealsIcon).toBeInTheDocument();

    await userEvent.click(drinksIcon);

    const pageTitleNew = screen.getByTestId(PAGETITLE);
    expect(pageTitleNew).toHaveTextContent('Drinks');

    expect(drinksIcon).toBeInTheDocument();

    expect(mealsIcon).toBeInTheDocument();

    await userEvent.click(mealsIcon);

    const pageTitleMealsNew = screen.getByTestId(PAGETITLE);
    expect(pageTitleMealsNew).toHaveTextContent('Meals');
  });
});
