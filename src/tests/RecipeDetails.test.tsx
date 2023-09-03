import { vi } from 'vitest';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetchMock from './helpers/fetchMock';

describe('Verifica se a pagina RecipeDetails é renderizada corretamente', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(fetchMock);
    window.alert = vi.fn(() => {});
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('testando se todas as informações são testadas na tela', async () => {
    // global.fetch = vi.fn();
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });
  });
});
