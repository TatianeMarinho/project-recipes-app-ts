import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import RecipeCardDetails from '../../components/details/RecipeDetailsCard';
import ButtonsCard from '../../components/buttonsCard/buttonsCard';
import ContextRecipesApp from '../../context/user-context';
import useFetchRecipeDetails from '../../hooks/useFetchRecipeDetails';
import { DrinksType, MealsType } from '../../types/types';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { fetchDrinksDetails,
    fetchFoodDetails } = useFetchRecipeDetails();
  const {
    recipeFood, setRecipeFood, recipeDrink, setRecipeDrink, recipe, setRecipe,
  } = useContext(ContextRecipesApp);

  const ingredientsAndMesures = (recipes: MealsType | DrinksType) => {
    if (recipes) {
      const measure = Object.entries(recipes as MealsType)
        .filter((entry) => entry[0]
          .includes('strMeasure') && entry[1] !== null && entry[1] !== '')
        .map((entry) => entry[1]);

      const ingredient = Object.entries(recipes as MealsType)
        .filter((entry) => entry[0]
          .includes('strIngredient') && entry[1] !== null && entry[1] !== '')
        .map((entry) => entry[1]);

      setRecipe({ ingredients: ingredient, measures: measure });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined && pathname === `/drinks/${id}/in-progress`) {
        const data = await fetchDrinksDetails(id);
        setRecipeDrink(data.drinks[0]);
        ingredientsAndMesures(data.drinks[0]);
      }
      if (id !== undefined && pathname === `/meals/${id}/in-progress`) {
        const data = await fetchFoodDetails(id);
        setRecipeFood(data[0]);
        ingredientsAndMesures(data[0]);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <ButtonsCard
        pathname={ pathname }
        id={ id }
        recipeDrink={ recipeDrink }
        recipeFood={ recipeFood }
      />
      <RecipeCardDetails
        key={ id }
        index={ Number(id) }
        foodRecipe={ recipeFood }
        drinkRecipe={ recipeDrink }
        recipe={ recipe }
      />
      <button
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </>
  );
}
export default RecipeInProgress;
