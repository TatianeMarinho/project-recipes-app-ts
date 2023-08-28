import { useContext, useState } from 'react';
import { MealsType, DrinksType } from '../types/types';
import ContextRecipesApp from '../context/user-context';

function useFetch() {
  const [food, setFood] = useState<MealsType[]>([]);
  const [drinks, setDrinks] = useState<DrinksType[]>([]);
  const { setFetchedDrinks, setFetchedFood } = useContext(ContextRecipesApp);
  const noRecipeFound = 'Sorry, we haven\'t found any recipes for these filters.';

  const handleSetDrinks = (data: DrinksType[]) => {
    if (!data) {
      window.alert(noRecipeFound);
    }
    setDrinks(data);
    setFetchedDrinks(data);
  };

  const handleSetFood = (data: MealsType[]) => {
    if (!data) {
      window.alert(noRecipeFound);
    }
    setFood(data);
    setFetchedFood(data);
  };

  const fetchFood = async (searchInput: string, selectedFilter: string) => {
    if (selectedFilter === 'firstLetter' && searchInput.length > 0) {
      window.alert('Your search must have only 1 (one) character');
    }

    switch (selectedFilter) {
      case 'ingredient':
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
          .then((result) => result.json())
          .then((data) => handleSetFood(data.meals))
          .catch(() => window.alert(noRecipeFound));
        break;
      case 'name':
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
          .then((result) => result.json())
          .then((data) => handleSetFood(data.meals))
          .catch(() => window.alert(noRecipeFound));
        break;
      case 'firstLetter':
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
          .then((result) => result.json())
          .then((data) => handleSetFood(data.meals))
          .catch(() => window.alert(noRecipeFound));
        break;
      default:
        return [];
    }
  };

  const fetchDrinks = async (searchInput: string, selectedFilter: string) => {
    if (selectedFilter === 'firstLetter' && searchInput.length > 0) {
      window.alert('Your search must have only 1 (one) character');
    }

    switch (selectedFilter) {
      case 'ingredient':
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`)
          .then((result) => result.json())
          .then((data) => handleSetDrinks(data.drinks))
          .catch(() => window.alert(noRecipeFound));
        break;
      case 'name':
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
          .then((result) => result.json())
          .then((data) => handleSetDrinks(data.drinks))
          .catch(() => window.alert(noRecipeFound));
        break;
      case 'firstLetter':
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`)
          .then((result) => result.json())
          .then((data) => handleSetDrinks(data.drinks))
          .catch(() => window.alert(noRecipeFound));
        break;
      default:
        return [];
    }
  };

  const fetchDrinksDetails = async (id: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  };

  const fetchFoodDetails = async (id: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals;
  };

  return {
    food,
    drinks,
    fetchFood,
    fetchDrinks,
    fetchDrinksDetails,
    fetchFoodDetails,
  };
}

export default useFetch;
