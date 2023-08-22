import { useState } from 'react';
import { INICIAL_LOGIN, InputsLoginTypes, UseProviderType } from '../types/types';
import ContextRecipesApp from './user-context';

function RecipesAppProvider({ children }: UseProviderType) {
  const [login, setLogin] = useState<InputsLoginTypes>(INICIAL_LOGIN);

  const contextReturn = {
    login,
    setLogin,
  };

  return (
    <ContextRecipesApp.Provider value={ contextReturn }>
      {children}
    </ContextRecipesApp.Provider>
  );
}

export default RecipesAppProvider;