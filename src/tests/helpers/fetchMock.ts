import drinkCategoriesMock from './drinkCategoriesMock';
import drinkDetailMock from './drinkDetailMock';
import drinkFilterCocoa from './drinkFilterCocoa';
import firstLetter from './firstLetterMock';
import foodCategoriesMock from './foodCategoriesMock';
import foodDetailMock from './foodDetailMock';
import foodFilterDessert from './foodFilterDessert';
import ingredientDrinkMock from './ingredientDrinkMock';
import ingredientMock from './ingredientMock';
import initialDrinkMock from './initialDrinkMock';
import initialFoodMock from './initialFoodMock';
import nameDrinkMock from './nameDrinkMock';
import nameMock from './nameMock';

const fetchMock = (url: any) => {
  return Promise.resolve({
    json: () => {
      switch (url) {
        case 'https://www.themealdb.com/api/json/v1/1/list.php?c=list':
          return Promise.resolve(foodCategoriesMock);
        case 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list':
          return Promise.resolve(drinkCategoriesMock);
        case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa':
          return Promise.resolve(drinkFilterCocoa);
        case 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert':
          return Promise.resolve(foodFilterDessert);
        case 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997':
          return Promise.resolve(drinkDetailMock);
        case 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977':
          return Promise.resolve(foodDetailMock);
        case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=':
          return Promise.resolve(initialDrinkMock);
        case 'https://www.themealdb.com/api/json/v1/1/search.php?s=':
          return Promise.resolve(initialFoodMock);
        case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Oregano':
          return Promise.resolve(ingredientMock);
        case 'https://www.themealdb.com/api/json/v1/1/search.php?f=a':
          return Promise.resolve(firstLetter);
        case 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata':
          return Promise.resolve(nameMock);
        case 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Banana':
          return Promise.resolve(ingredientDrinkMock);
        case 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Banana Cantaloupe Smoothie':
          return Promise.resolve(nameDrinkMock);
        default:
          return Promise.resolve({});
      }
    },
  });
};

export default fetchMock;
