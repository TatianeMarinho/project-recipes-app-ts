import { useEffect, useState } from 'react';
import { IngredientsList, IsCheckedState, RecipeDetailCardType } from '../../types/types';
import useLocalStorage from '../../hooks/useLocalStorage';

function RecipeCardInProgress(props: RecipeDetailCardType) {
  const {
    foodRecipe,
    drinkRecipe,
    recipe,
    setRecipeIsFinished,
  } = props;
  const {
    value: localStorage,
    updateValue: updateLocalStorage,
  } = useLocalStorage('inProgressRecipes', '{}');
  const localStorageInProgress = JSON.parse(localStorage);
  const [isChecked, setIsChecked] = useState<IsCheckedState>(localStorageInProgress);

  // insere ingredientes no localStorage com todos os checks em false
  useEffect(() => {
    const recipeIngredients = {} as IngredientsList;
    recipe.ingredients.forEach((ingredient, index) => {
      recipeIngredients[index] = false;
    });

    let initialLocalStorage = {};
    if (foodRecipe) {
      if (localStorageInProgress[foodRecipe.idMeal] !== undefined) return;
      initialLocalStorage = {
        [foodRecipe.idMeal]: recipeIngredients,
      };
      setIsChecked({ ...isChecked, ...initialLocalStorage });
    } else if (drinkRecipe) {
      if (localStorageInProgress[drinkRecipe.idDrink] !== undefined) return;
      initialLocalStorage = {
        [drinkRecipe.idDrink]: recipeIngredients,
      };
      setIsChecked({ ...isChecked, ...initialLocalStorage });
    }
  }, []);

  useEffect(() => {
    updateLocalStorage(JSON.stringify(isChecked));
    // checa se a receita está completa
    if (foodRecipe && isChecked[foodRecipe.idMeal]) {
      const numberOfChecked = Object.keys(isChecked[foodRecipe.idMeal]).length;
      if (numberOfChecked === recipe.ingredients.length) {
        const checkedIngredients = recipe.ingredients.find((_, index) => {
          return isChecked[foodRecipe.idMeal][index] === false;
        });
        if (!checkedIngredients) {
          return setRecipeIsFinished(true);
        }
        return setRecipeIsFinished(false);
      }
      return setRecipeIsFinished(false);
    } if (drinkRecipe && isChecked[drinkRecipe.idDrink]) {
      const numberOfChecked = Object.keys(isChecked[drinkRecipe.idDrink]).length;
      if (numberOfChecked === recipe.ingredients.length) {
        const checkedIngredients = recipe.ingredients.find((_, index) => {
          return isChecked[drinkRecipe.idDrink][index] === false;
        });
        if (!checkedIngredients) {
          return setRecipeIsFinished(true);
        }
        return setRecipeIsFinished(false);
      }
      return setRecipeIsFinished(false);
    }
  }, [isChecked]);

  const handleChecked = (id: string, index: number) => {
    // recebe o estado anterior(prevState) como parametro
    setIsChecked((prevState) => ({
    // clona o estado anterior
      ...prevState,
      [id]: {
        ...prevState[id],
        // atualiza uma propriedade do objeto. no indice tal sera trocado para false ou true
        [index]: !prevState[id]?.[index] || false,
      },
    }));
  };

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
                style={
                  isChecked[foodRecipe.idMeal]?.[index]
                    ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                    : {}
                }
              >
                <input
                  type="checkbox"
                  name="ingredient"
                  className="checkbox"
                  checked={ isChecked[foodRecipe.idMeal]?.[index] }
                  onChange={ () => handleChecked(foodRecipe.idMeal, index) }
                />
                { `${ingredient} - ${recipe.measures?.[index]}` }
              </label>
            ))
          }
        </div>
        <p data-testid="instructions">{foodRecipe.strInstructions}</p>
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
              style={
                isChecked[drinkRecipe.idDrink]?.[index]
                  ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                  : {}
              }
            >
              <input
                type="checkbox"
                name="ingredient"
                id={ ingredient }
                checked={ isChecked[drinkRecipe.idDrink]?.[index] }
                onChange={ () => handleChecked(drinkRecipe.idDrink, index) }
              />
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
