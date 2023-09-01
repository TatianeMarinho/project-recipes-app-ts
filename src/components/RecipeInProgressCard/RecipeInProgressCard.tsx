import { useEffect, useState } from 'react';
import { IsCheckedState, RecipeDetailCardType } from '../../types/types';
import useLocalStorage from '../../hooks/useLocalStorage';

function RecipeCardInProgress(props: RecipeDetailCardType) {
  const { foodRecipe, drinkRecipe, recipe } = props;
  const [isChecked, setIsChecked] = useState<IsCheckedState>({});

  const localStorageProgressRecipes = useLocalStorage('inProgressRecipes', '{}');
  console.log(isChecked);
  useEffect(() => {
    localStorageProgressRecipes
      .JSON.stringify(isChecked);
  }, [isChecked, localStorageProgressRecipes]);

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
