import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ButtonsCard from '../../components/buttonsCard/buttonsCard';
import ContextRecipesApp from '../../context/user-context';
import useFetchRecipeDetails from '../../hooks/useFetchRecipeDetails';
import { DrinksType, MealsType } from '../../types/types';
import RecipeCardInProgress from
  '../../components/RecipeInProgressCard/RecipeInProgressCard';
import useLocalStorage from '../../hooks/useLocalStorage';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { fetchDrinksDetails,
    fetchFoodDetails } = useFetchRecipeDetails();
  const {
    recipeFood, setRecipeFood, recipeDrink, setRecipeDrink, recipe, setRecipe,
  } = useContext(ContextRecipesApp);
  const [recipeIsFinished, setRecipeIsFinished] = useState(false);
  const {
    value,
    updateValue,
  } = useLocalStorage('doneRecipes', '[]');
  const navigate = useNavigate();

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

  const handleFinishRecipe = () => {
    const currDoneRecipes = JSON.parse(value);
    const dateNow = new Date();
    if (id !== undefined && pathname === `/meals/${id}/in-progress` && recipeFood) {
      const tags = recipeFood.strTags !== null ? recipeFood.strTags.split(',') : [];
      const doneMeal = {
        id: recipeFood.idMeal,
        type: 'meal',
        nationality: recipeFood.strArea,
        category: recipeFood.strCategory,
        alcoholicOrNot: '',
        name: recipeFood.strMeal,
        image: recipeFood.strMealThumb,
        doneDate: dateNow.toISOString(),
        tags,
      };
      updateValue(JSON.stringify([...currDoneRecipes, doneMeal]));
    } if (id !== undefined && pathname === `/drinks/${id}/in-progress` && recipeDrink) {
      const tags = recipeDrink.strTags !== null ? recipeDrink.strTags.split(',') : [];
      const doneDrink = {
        id: recipeDrink.idDrink,
        type: 'drink',
        nationality: '',
        category: recipeDrink.strCategory,
        alcoholicOrNot: recipeDrink.strAlcoholic,
        name: recipeDrink.strDrink,
        image: recipeDrink.strDrinkThumb,
        doneDate: dateNow.toISOString(),
        tags,
      };
      updateValue(JSON.stringify([...currDoneRecipes, doneDrink]));
    }
    navigate('/done-recipes');
  };

  return (
    <>
      <ButtonsCard
        pathname={ pathname }
        id={ id }
        recipeDrink={ recipeDrink }
        recipeFood={ recipeFood }
      />
      <RecipeCardInProgress
        key={ id }
        index={ Number(id) }
        foodRecipe={ recipeFood }
        drinkRecipe={ recipeDrink }
        recipe={ recipe }
        setRecipeIsFinished={ setRecipeIsFinished }
      />
      <button
        disabled={ !recipeIsFinished }
        data-testid="finish-recipe-btn"
        onClick={ handleFinishRecipe }
      >
        Finish Recipe
      </button>
    </>
  );
}
export default RecipeInProgress;
