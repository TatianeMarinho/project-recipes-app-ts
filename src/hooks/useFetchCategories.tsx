import { useContext, useState } from 'react';
import { DrinkCategory, FoodCategory } from '../types/types';
import ContextRecipesApp from '../context/user-context';

const useFetchCategories = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>();
  const [drinksCategories, setDrinksCategories] = useState<DrinkCategory[]>();
  const { setFetchedDrinks, setFetchedFood } = useContext(ContextRecipesApp);
  const alert = 'Nenhuma retorno encontrado!';

  const fetchFoodCategories = async () => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((result) => result.json())
      .then((data) => setFoodCategories(data.meals))
      .catch(() => window.alert('Nenhuma categoria encontrada!'));
  };

  const fetchDrinksCategories = async () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((result) => result.json())
      .then((data) => setDrinksCategories(data.drinks))
      .catch(() => window.alert('Nenhuma categoria encontrada!'));
  };

  const fetchFoodFiltered = async (category: string) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((result) => result.json())
      .then((data) => setFetchedFood(data.meals))
      .catch(() => window.alert(alert));
  };

  const fetchDrinksFiltered = async (category: string) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((result) => result.json())
      .then((data) => setFetchedDrinks(data.drinks))
      .catch(() => window.alert(alert));
  };

  return {
    foodCategories,
    fetchFoodCategories,
    drinksCategories,
    fetchDrinksCategories,
    fetchFoodFiltered,
    fetchDrinksFiltered,
  };
};

export default useFetchCategories;
