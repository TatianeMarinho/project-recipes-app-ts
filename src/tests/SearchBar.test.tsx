import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import firstLetter from './helpers/firstLetterMock';
import nameMock from './helpers/nameMock';

describe('Verifica barra de busca', () => {
  test('Verifica pesquisa por primeira letra', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (firstLetter),
    });
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    await userEvent.click(btnSearch);

    const searchInput = screen.getByTestId('search-input');
    const ingredienteInput = screen.getByTestId('ingredient-search-radio');
    const nameInput = screen.getByTestId('name-search-radio');
    const firstLetterInput = screen.getByTestId('first-letter-search-radio');
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
  });
  test('Testa pesquisa por nome', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (nameMock),
    });
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const btnSearch = screen.getByRole('button', { name: /icone de pesquisa/i });
    expect(btnSearch).toBeInTheDocument();

    await userEvent.click(btnSearch);

    const searchInput = screen.getByTestId('search-input');
    const ingredienteInput = screen.getByTestId('ingredient-search-radio');
    const nameInput = screen.getByTestId('name-search-radio');
    const firstLetterInput = screen.getByTestId('first-letter-search-radio');
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
  });
});
