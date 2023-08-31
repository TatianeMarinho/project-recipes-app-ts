// import App from "../App";
// import { renderWithRouter } from "./helpers/renderWith";
// import userEvent from '@testing-library/user-event';
// import { fireEvent, render, screen } from '@testing-library/react';
// import { vi } from "vitest";
// import foodCategoriesMock from "./helpers/foodCategoriesMock";
// import { fireEvent, render } from "@testing-library/react";
// import Recipes from "../pages/recipes/Recipes";

// describe('testando componente recipes', () => {
//   test('testando a funçao handleClickAll', async () => {
//     renderWithRouter(<App />, { initialEntries: ['/drinks'] });

//     const btnAll = screen.getByTestId('All-category-filter');
//     expect(btnAll).toBeInTheDocument()
//     await userEvent.click(btnAll);
//   })
// })


import { vi } from 'vitest';
import initialFoodMock from './helpers/initialFoodMock';
import initialDrinkMock from './helpers/initialDrinkMock';
import foodCategoriesMock from './helpers/foodCategoriesMock';
import drinkCategoriesMock from './helpers/drinkCategoriesMock';
import { renderWithRouter } from './helpers/renderWith';
import { screen } from '@testing-library/dom';
import App from '../App';


describe('Recipes component behaves as expected', async () => {
  test('test', () => {
    const fetch = (url: string) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'){
          return Promise.resolve(foodCategoriesMock);
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'){
          return Promise.resolve(drinkCategoriesMock);
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s='){
          return Promise.resolve(initialFoodMock);
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='){
          return Promise.resolve(initialDrinkMock);
        }
      },
    });
        
    vi.spyOn(global, 'fetch').mockImplementation(fetch);
  
  
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    screen.debug();
  })

});
