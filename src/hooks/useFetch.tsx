import { useContext, useEffect, useState } from 'react';
import { MealsType, DrinksType } from '../types/types';
import ContextRecipesApp from '../context/user-context';

function useFetch() {
  const [food, setFood] = useState<MealsType[]>([]);
  const [drinks, setDrinks] = useState<DrinksType[]>([]);
  const { setFetchedDrinks, setFetchedFood } = useContext(ContextRecipesApp);

  useEffect(() => {
    if (!drinks || !food) {
      window.alert("Sorry, we haven't found any recipes for these filters");
    }
  }, [drinks, food]);

  const fetchFood = async (searchInput: string, selectedFilter: string) => {
    if (selectedFilter === 'firstLetter' && searchInput.length > 0) {
      window.alert('Your search must have only 1 (one) character');
    }

    switch (selectedFilter) {
      case 'ingredient':
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
          .then((result) => result.json())
          .then((data) => {
            setFood(data.meals);
            setFetchedFood(data.meals);
          });
        break;
      case 'name':
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
          .then((result) => result.json())
          .then((data) => {
            setFood(data.meals);
            setFetchedFood(data.meals);
          });
        break;
      case 'firstLetter':
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
          .then((result) => result.json())
          .then((data) => {
            setFood(data.meals);
            setFetchedFood(data.meals);
          });
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
          .then((data) => {
            setDrinks(data.drinks);
            setFetchedDrinks(data.drinks);
          });
        break;
      case 'name':
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
          .then((result) => result.json())
          .then((data) => {
            setDrinks(data.drinks);
            setFetchedDrinks(data.drinks);
          });
        break;
      case 'firstLetter':
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`)
          .then((result) => result.json())
          .then((data) => {
            setDrinks(data.drinks);
            setFetchedDrinks(data.drinks);
          });
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
  };
}

export default useFetch;
