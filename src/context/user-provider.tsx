import { useState } from 'react';
import ContextRecipesApp from './user-context';
import {
  INITIAL_LOGIN,
  InputsLoginTypes,
  UseProviderType,
} from '../types/types';

function RecipesAppProvider({ children }: UseProviderType) {
  const [login, setLogin] = useState<InputsLoginTypes>(INITIAL_LOGIN);
  const [fetchedDrinks, setFetchedDrinks] = useState([]);
  const [fetchedFood, setFetchedFood] = useState([]);
  const contextReturn = {
    login,
    setLogin,
    fetchedDrinks,
    setFetchedDrinks,
    fetchedFood,
    setFetchedFood,
  };

  return (
    <ContextRecipesApp.Provider value={ contextReturn }>
      {children}
    </ContextRecipesApp.Provider>
  );
}

export default RecipesAppProvider;
