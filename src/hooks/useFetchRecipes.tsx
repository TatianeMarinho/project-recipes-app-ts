import { useContext, useState } from 'react';
import { MealsType, DrinksType } from '../types/types';
import ContextRecipesApp from '../context/user-context';

function useFetchRecipes() {
  const [food, setFood] = useState<MealsType[]>([]);
  const [drinks, setDrinks] = useState<DrinksType[]>([]);
  const { setFetchedDrinks, setFetchedFood } = useContext(ContextRecipesApp);
  const noRecipeFound = 'Sorry, we haven\'t found any recipes for these filters.';

  const fetchFoodInitial = async () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((result) => result.json())
      .then((data) => handleSetFood(data.meals))
      .catch(() => window.alert(noRecipeFound));
  };

  const fetchDrinksInitial = async () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((result) => result.json())
      .then((data) => handleSetDrinks(data.drinks))
      .catch(() => window.alert(noRecipeFound));
  };

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
    console.log('fetchFood');
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
    console.log('fetchDrinks');
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

  return {
    food,
    drinks,
    fetchFood,
    fetchDrinks,
    fetchFoodInitial,
    fetchDrinksInitial,
  };
}

export default useFetchRecipes;
