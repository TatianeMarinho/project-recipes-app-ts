import { useEffect, useState } from 'react';
import { DrinksType, MealsType, RecipeDetailCardType } from '../../types/types';
import useFetch from '../../hooks/useFetch';

function RecipeCardDetails(props: RecipeDetailCardType) {
  const { foodRecipe, drinkRecipe } = props;
  const [recipe, setRecipe] = useState({
    ingredients: [''],
    measures: [''],
  });
  const { fetchRecomendadedMeals, fetchRecomendadedDrinks } = useFetch();

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
    if (foodRecipe) {
      ingredientsAndMesures(foodRecipe);
      fetchRecomendadedDrinks();
    } else if (drinkRecipe) {
      ingredientsAndMesures(drinkRecipe);
      fetchRecomendadedMeals();
    }
  }, [drinkRecipe, foodRecipe, fetchRecomendadedDrinks, fetchRecomendadedMeals]);

  if (foodRecipe) {
    return (
      <div>
        <img
          src={ foodRecipe.strMealThumb }
          alt={ foodRecipe.strMeal }
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{foodRecipe.strMeal}</h1>
        <h4 data-testid="recipe-category">
          {`Category: ${foodRecipe.strCategory}`}
        </h4>
        <h5>Ingredients:</h5>
        <ul>
          {
          recipe.ingredients?.map((ingredient, index) => (
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredient} - ${recipe.measures?.[index]}` }
            </li>
          ))
          }
        </ul>
        <p data-testid="instructions">{foodRecipe.strInstructions}</p>
        <div>
          <iframe
            src={ foodRecipe.strYoutube }
            title="Vídeo da receita"
            width="560"
            height="315"
            data-testid="video"
          />
        </div>
      </div>
    );
  }
  if (drinkRecipe) {
    return (
      <div>
        <img
          src={ drinkRecipe.strDrinkThumb }
          alt={ drinkRecipe.strDrink }
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{drinkRecipe.strDrink}</h1>
        <h4 data-testid="recipe-category">{drinkRecipe.strAlcoholic}</h4>
        <h5>Ingredients:</h5>
        <ul>
          {
          recipe.ingredients?.map((ingredient, index) => (
            <li
              key={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredient} - ${recipe.measures?.[index]}` }
            </li>
          ))
          }
        </ul>
        <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
      </div>
    );
  }
}

export default RecipeCardDetails;
