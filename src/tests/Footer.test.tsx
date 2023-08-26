import { screen } from '@testing-library/react';
import App from '../App';
import { PAGETITLE } from '../types/types';
import { renderWithRouter } from './helpers/renderWith';

describe('Verifica se o componente Footer é renderizado corretamente', () => {
  test('Verifica a renderizaçao do Footer no /meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const pageTitle = screen.getByTestId(PAGETITLE);
    expect(pageTitle).toHaveTextContent('Meals');

    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(drinksIcon).toBeInTheDocument();

    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();
  });
});
