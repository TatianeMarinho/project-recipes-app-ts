import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContextRecipesApp from '../../context/user-context';
import RecipeCard from '../../components/recipes/RecipeCard';
import useFetchRecipes from '../../hooks/useFetchRecipes';
import useFetchCategories from '../../hooks/useFetchCategories';
import { FoodCategory } from '../../types/types';

function Recipes() {
  const { pathname } = useLocation();
  const { fetchedFood, fetchedDrinks } = useContext(ContextRecipesApp);
  const {
    foodCategories,
    fetchFoodCategories,
    drinksCategories,
    fetchDrinksCategories,
  } = useFetchCategories();
  const { fetchDrinksInitial, fetchFoodInitial } = useFetchRecipes();

  useEffect(() => {
    if (pathname === '/meals') {
      fetchFoodInitial();
      fetchFoodCategories();
    } else {
      fetchDrinksInitial();
      fetchDrinksCategories();
    }
  }, []);

  return (
    <>
      <h1>Recipes</h1>
      {pathname === '/meals' && foodCategories && foodCategories
        .map(({ strCategory: categoryName }, index) => {
          if (index > 4) return;
          return (
            <button
              key={ categoryName }
              data-testid={ `${categoryName}-category-filter` }
            >
              { categoryName }
            </button>
          );
        })}
      {pathname === '/drinks' && drinksCategories && drinksCategories
        .map(({ strCategory: categoryName }, index) => {
          if (index > 4) return;
          return (
            <button
              key={ categoryName }
              data-testid={ `${categoryName}-category-filter` }
            >
              { categoryName }
            </button>
          );
        })}
      {pathname === '/meals' && fetchedFood && fetchedFood.map((food, index) => {
        if (index >= 12) return null;
        return (
          <RecipeCard
            key={ food.idMeal }
            index={ index }
            foodRecipe={ food }
          />
        );
      })}
      {pathname === '/drinks' && fetchedDrinks && fetchedDrinks.map((drink, index) => {
        if (index >= 12) return null;
        return (
          <RecipeCard
            key={ drink.idDrink }
            index={ index }
            drinkRecipe={ drink }
          />
        );
      })}
    </>
  );
}
export default Recipes;
