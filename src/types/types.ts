export type UseContextType = {
  login: InputsLoginTypes;
  setLogin: React.Dispatch<React.SetStateAction<InputsLoginTypes>>;
};

export type UseProviderType = {
  children: React.ReactNode;
};

export type InputsLoginTypes = {
  email: string;
  password: string;
};

export type UseLocalStorageType = {
  value: string;
  updateValue: (newValue: string) => void;
};

export type FetchAPIType = {
  [key: string]: object[]
};

export type DrinksType = {
  idDrink: string,
  strDrink: string,
  strDrinkAlternate: string,
};

export type MealsType = {
  idMeals: string,
  strMeals: string,
  strMealsAlternate: string,
};

export const INICIAL_LOGIN = {
  email: '',
  password: '',
};
