import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { getByTestId, screen, waitFor } from '@testing-library/dom';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetchMock from './helpers/fetchMock';
import initialDrinkMock from './helpers/initialDrinkMock';
import initialFoodMock from './helpers/initialFoodMock';

const whiteHeartIcon = '/src/images/whiteHeartIcon.svg';

describe('Verifica se a pagina RecipeDetails é renderizada corretamente', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(fetchMock);
    window.alert = vi.fn(() => {});
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Testa se todos os detalhes são renderizadas na tela de meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    const h1 = await screen.findAllByRole('heading', { level: 1 });
    expect(h1[0]).toHaveTextContent(/Corba/i);
    const h4 = await screen.findAllByRole('heading', { level: 4 });
    expect(h4[0]).toHaveTextContent(/Category: Side/i);
    const ingredients = await screen.findAllByRole('listitem');
    expect(ingredients).toHaveLength(13);
    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toHaveTextContent(/Pick through your lentils for any foreign debris/i);
    expect(await screen.findByTestId('video')).toHaveAttribute('title', 'Vídeo da receita');
    expect(h4[1]).toHaveTextContent(/Recommended Recipes/i);
    initialDrinkMock.drinks.forEach(async (drink, index) => {
      if (index <= 5) {
        const recommendationTitle = await screen.findByTestId(`${index}-recommendation-title`);
        expect(recommendationTitle).toHaveTextContent(drink.strDrink);
        expect(recommendationTitle.nextSibling).toHaveTextContent(drink.strAlcoholic);
      } else {
        const recommendationTitle = screen.queryByTestId(`${index}-recommendation-title`);
        expect(recommendationTitle).toBeNull();
      }
    });

    const startRecipe = screen.getByTestId('start-recipe-btn');
    await userEvent.click(startRecipe);
    screen.findByText('RecipeInProgress 52977');
  });
  test('Testa os botões de compartilhar e favoritar na pagina meals', async () => {
    userEvent.setup();
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
    const h1 = await screen.findAllByRole('heading', { level: 1 });
    expect(h1[0]).toHaveTextContent(/Corba/i);

    const shareButton = await screen.findByTestId('share-btn');
    await userEvent.click(shareButton);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', whiteHeartIcon);
    await userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
    await userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', whiteHeartIcon);
  });
  test('Testa os botões de compartilhar e favoritar na pagina drinks', async () => {
    userEvent.setup();
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });
    const h1 = await screen.findAllByRole('heading', { level: 1 });
    expect(h1[0]).toHaveTextContent(/GG/i);

    const shareButton = await screen.findByTestId('share-btn');
    await userEvent.click(shareButton);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', whiteHeartIcon);
    await userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
    await userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', whiteHeartIcon);
  });

  test('Testa se todos os detalhes são renderizadas na tela de drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });
    const h1 = await screen.findAllByRole('heading', { level: 1 });
    expect(h1[0]).toHaveTextContent(/GG/i);
    const h4 = await screen.findAllByRole('heading', { level: 4 });
    expect(h4[0]).toHaveTextContent(/Optional Alcohol/i);
    const ingredients = await screen.findAllByRole('listitem');
    expect(ingredients).toHaveLength(3);
    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toHaveTextContent(/Pour the Galliano liqueur over ice./i);
    expect(h4[1]).toHaveTextContent(/Recommended Recipes/i);
    initialFoodMock.meals.forEach(async (meal, index) => {
      if (index <= 5) {
        const recommendationTitle = await screen.findByTestId(`${index}-recommendation-title`);
        expect(recommendationTitle).toHaveTextContent(meal.strMeal);
        expect(recommendationTitle.nextSibling).toHaveTextContent(meal.strCategory);
      } else {
        const recommendationTitle = screen.queryByTestId(`${index}-recommendation-title`);
        expect(recommendationTitle).toBeNull();
      }
    });
    const startRecipe = screen.getByTestId('start-recipe-btn');
    await userEvent.click(startRecipe);
    screen.findByText('RecipeInProgress 15997');
  });
});
