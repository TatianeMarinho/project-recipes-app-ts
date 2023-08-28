import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContextRecipesApp from '../../context/user-context';
import RecipeCard from '../../components/recipes/RecipeCard';
import useFetch from '../../hooks/useFetch';

function Recipes() {
  const { pathname } = useLocation();
  const { fetchedFood, fetchedDrinks } = useContext(ContextRecipesApp);
  const { fetchDrinksInitial, fetchFoodInitial } = useFetch();

  useEffect(() => {
    if (pathname === '/meals') {
      fetchFoodInitial();
    } else {
      fetchDrinksInitial();
    }
  }, []);

  return (
    <>
      <h1>Recipes</h1>
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
