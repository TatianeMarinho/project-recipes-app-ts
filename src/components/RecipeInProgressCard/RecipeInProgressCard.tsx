import { RecipeDetailCardType } from '../../types/types';

function RecipeCardInProgress(props: RecipeDetailCardType, pathname: string) {
  const { foodRecipe, drinkRecipe, recipe } = props;

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
        <div>
          {
            recipe.ingredients?.map((ingredient, index) => (
              <label
                key={ ingredient }
                data-testid={ `${index}-ingredient-step` }
              >
                <input type="checkbox" />
                { `${ingredient} - ${recipe.measures?.[index]}` }
              </label>
            ))
          }
        </div>
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
        {
          recipe.ingredients?.map((ingredient, index) => (
            <label
              key={ ingredient }
              data-testid={ `${index}-ingredient-step` }
            >
              <input type="checkbox" />
              { `${ingredient} - ${recipe.measures?.[index]}` }
            </label>
          ))
        }
        <p data-testid="instructions">{drinkRecipe.strInstructions}</p>
      </div>
    );
  }
}

export default RecipeCardInProgress;
