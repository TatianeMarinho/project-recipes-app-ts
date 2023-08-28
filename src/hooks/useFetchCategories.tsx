import { useState } from 'react';
import { DrinkCategory, FoodCategory } from '../types/types';

const useFetchCategories = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>();
  const [drinksCategories, setDrinksCategories] = useState<DrinkCategory[]>();

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

  return { foodCategories, fetchFoodCategories, drinksCategories, fetchDrinksCategories };
};

export default useFetchCategories;
