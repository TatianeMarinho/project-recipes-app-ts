import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Testa a página Recipes', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(fetchMock);
    window.alert = vi.fn(() => {});
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Testa se todos os botões de filtro aparecem', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    waitFor(() => screen.findByText('Corba'));
    const btnAll = screen.getByTestId('All-category-filter');
    expect(btnAll).toBeInTheDocument();
    await userEvent.click(btnAll);
  });
});
