import drinkCategoriesMock from "./drinkCategoriesMock";
import foodCategoriesMock from "./foodCategoriesMock";
import initialDrinkMock from "./initialDrinkMock";
import initialFoodMock from "./initialFoodMock";

const fetchMock = (url: string) => Promise.resolve({
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
    if(url === '')
    return Promise.reject(new Error('Invalid url'));
  },
});

export default fetchMock;
