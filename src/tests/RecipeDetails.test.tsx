import { vi } from 'vitest';
import initialFoodMock from './helpers/initialFoodMock';
import foodCategoriesMock from './helpers/foodCategoriesMock';
import nameMock from './helpers/nameMock';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Verifica se a pagina RecipeDetails é renderizada corretamente', () => {
  test('testando se todas as informações são testadas na tela', async () => {
    // global.fetch = vi.fn();
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
  });
});
