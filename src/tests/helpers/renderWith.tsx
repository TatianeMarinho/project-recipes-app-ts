import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UseProviderType } from '../../types/types';

type Options = {
  initialEntries?: string[];
  initialState?: any;
  RecipesAppProvider?: UseProviderType;
};

function withRouter(component: React.ReactElement, initialEntries: string[]) {
  return (
    <MemoryRouter initialEntries={ initialEntries }>
      { component }
    </MemoryRouter>
  );
}

export function renderWithRouter(
  component: React.ReactElement,
  {
    initialEntries = ['/'],
  }: Options = {},
) {
  return render(withRouter(component, initialEntries));
}
