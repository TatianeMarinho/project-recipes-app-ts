export type UseContextType = {
  login: InputsLoginTypes;
  setLogin: React.Dispatch<React.SetStateAction<InputsLoginTypes>>;
  fetchedDrinks: DrinksType[];
  setFetchedDrinks: (value: any) => void;
  fetchedFood: MealsType[];
  setFetchedFood: (value: any) => void;
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
  strDrinkThumb: string,
};

export type MealsType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
};

export const INITIAL_LOGIN = {
  email: '',
  password: '',
};

export type RecipeCardType = {
  index: number,
  foodRecipe?: MealsType,
  drinkRecipe?: DrinksType,
};
