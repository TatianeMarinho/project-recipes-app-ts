import App from "../App";
import { renderWithRouter } from "./helpers/renderWith";
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

describe('testando componente recipes', () => {
  test('testando a funçao handleClickAll', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const btnAll = screen.getByTestId('All-category-filter');
    expect(btnAll).toBeInTheDocument()
    await userEvent.click(btnAll);
  })
})