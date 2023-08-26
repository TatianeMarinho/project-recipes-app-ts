import { DrinksType, MealsType, RecipeCardType } from '../../types/types';

function RecipeCard(props: RecipeCardType) {
  const { index, foodRecipe, drinkRecipe } = props;
  if (foodRecipe) {
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <h1 data-testid={ `${index}-card-name` }>{foodRecipe.strMeal}</h1>
        <img
          src={ foodRecipe.strMealThumb }
          alt={ foodRecipe.strMeal }
          data-testid={ `${index}-card-img` }
        />
      </div>
    );
  }
  if (drinkRecipe) {
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <h1 data-testid={ `${index}-card-name` }>{drinkRecipe.strDrink}</h1>
        <img
          src={ drinkRecipe.strDrinkThumb }
          alt={ drinkRecipe.strDrink }
          data-testid={ `${index}-card-img` }
        />
      </div>
    );
  }
}

export default RecipeCard;
