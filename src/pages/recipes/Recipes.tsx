import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ContextRecipesApp from '../../context/user-context';
import RecipeCard from '../../components/recipes/RecipeCard';

function Recipes() {
  const { pathname } = useLocation();
  const { fetchedFood, fetchedDrinks } = useContext(ContextRecipesApp);
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
