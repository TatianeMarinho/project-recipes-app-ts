import { useState } from 'react';
import { FetchAPIType } from '../types/types';

function useFetch() {
  const [food, setFood] = useState<FetchAPIType[]>([]);
  const [drinks, setDrinks] = useState<FetchAPIType[]>([]);

  const fetchFood = async (searchInput: string, selectedFilter: string) => {
    switch (selectedFilter) {
      case 'ingredient':
        fetch(`https://www.themealdb.com/api.php?i=${searchInput}`)
          .then((result) => result.json())
          .then((data) => setFood(data.meals));
        break;
      case 'name':
        fetch(`https://www.themealdb.com/api.php?s=${searchInput}`)
          .then((result) => result.json())
          .then((data) => setFood(data.meals));
        break;
      case 'firstLetter':
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
          .then((result) => result.json())
          .then((data) => setFood(data.meals));
        break;
      default:
        return [];
    }
  };

  const fetchDrinks = async () => {
    const drinksResponse = await fetch('https://www.thecocktaildb.com/api.php');
    const drinksData = await drinksResponse.json();
    setDrinks(drinksData.drinks);
  };

  return {
    food,
    drinks,
    fetchFood,
    fetchDrinks,
  };
}

export default useFetch;
