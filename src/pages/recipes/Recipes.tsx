import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContextRecipesApp from '../../context/user-context';
import RecipeCard from '../../components/recipes/RecipeCard';
import useFetchRecipes from '../../hooks/useFetchRecipes';
import useFetchCategories from '../../hooks/useFetchCategories';

function Recipes() {
  const { pathname } = useLocation();
  const { fetchedFood, fetchedDrinks } = useContext(ContextRecipesApp);
  const {
    foodCategories,
    fetchFoodCategories,
    drinksCategories,
    fetchDrinksCategories,
    fetchDrinksFiltered,
    fetchFoodFiltered,
  } = useFetchCategories();
  const { fetchDrinksInitial, fetchFoodInitial } = useFetchRecipes();
  const ERROR = 'erro na requisição';

  useEffect(() => {
    if (pathname === '/meals') {
      fetchFoodInitial();
      fetchFoodCategories();
    } else {
      fetchDrinksInitial();
      fetchDrinksCategories();
    }
  }, [pathname]);

  const handleClickDrinks = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: string,
  ) => {
    event.preventDefault();
    try {
      fetchDrinksFiltered(category);
    } catch (error) {
      console.error(ERROR, error);
    }
  };

  const handleClickFoods = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: string,
  ) => {
    event.preventDefault();
    try {
      fetchFoodFiltered(category);
    } catch (error) {
      console.error(ERROR, error);
    }
  };

  const handleClickAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (pathname === 'meals') {
        fetchFoodInitial();
      } else if (pathname === 'drinks') {
        fetchDrinksInitial();
      }
    } catch (error) {
      console.error(ERROR, error);
    }
  };

  return (
    <>
      <h1>Recipes</h1>
      {pathname === '/meals' && foodCategories && foodCategories
        .map(({ strCategory: categoryName }, index) => {
          if (index > 4) return;
          return (
            <button
              key={ `${categoryName}-meals` }
              onClick={ (e) => handleClickFoods(e, categoryName) }
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
              key={ `${categoryName}-drinks` }
              onClick={ (e) => handleClickDrinks(e, categoryName) }
              data-testid={ `${categoryName}-category-filter` }
            >
              { categoryName }
            </button>
          );
        })}

      <button
        onClick={ (e) => handleClickAll(e) }
        data-testid="All-category-filter"
      >
        All
      </button>

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
