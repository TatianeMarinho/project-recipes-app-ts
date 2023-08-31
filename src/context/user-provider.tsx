import { useState } from 'react';
import ContextRecipesApp from './user-context';
import {
  DrinksType,
  FavoriteRecipeType,
  INITIAL_LOGIN,
  INITIAL_RECIPE_STATE,
  InputsLoginTypes,
  MealsType,
  UseProviderType,
} from '../types/types';

function RecipesAppProvider({ children }: UseProviderType) {
  const [login, setLogin] = useState<InputsLoginTypes>(INITIAL_LOGIN);
  const [fetchedDrinks, setFetchedDrinks] = useState([]);
  const [fetchedFood, setFetchedFood] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipeType[]>([]);
  const [recipeDrink, setRecipeDrink] = useState<DrinksType>();
  const [recipeFood, setRecipeFood] = useState<MealsType>();
  const [recipe, setRecipe] = useState(INITIAL_RECIPE_STATE);

  const contextReturn = {
    login,
    setLogin,
    fetchedDrinks,
    setFetchedDrinks,
    fetchedFood,
    setFetchedFood,
    favoriteRecipes,
    setFavoriteRecipes,
    recipeDrink,
    setRecipeDrink,
    recipeFood,
    setRecipeFood,
    recipe,
    setRecipe,
  };

  return (
    <ContextRecipesApp.Provider value={ contextReturn }>
      {children}
    </ContextRecipesApp.Provider>
  );
}

export default RecipesAppProvider;
