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
  strAlcoholic?: string,
  strIngredient1?: string,
  strIngredient2?: string,
  strIngredient3?: string,
  strIngredient4?: string,
  strIngredient5?: string,
  strIngredient6?: string,
  strIngredient7?: string,
  strIngredient8?: string,
  strIngredient9?: string,
  strIngredient10?: string,
  strIngredient11?: string,
  strIngredient12?: string,
  strIngredient13?: string,
  strIngredient14?: string,
  strIngredient15?: string,
  strIngredient16?: string,
  strIngredient17?: string,
  strIngredient18?: string,
  strIngredient19?: string,
  strIngredient20?: string,
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strInstructions?: string,
};

export type MealsType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
  strCategory?: string,
  strIngredient1?: string,
  strIngredient2?: string,
  strIngredient3?: string,
  strIngredient4?: string,
  strIngredient5?: string,
  strIngredient6?: string,
  strIngredient7?: string,
  strIngredient8?: string,
  strIngredient9?: string,
  strIngredient10?: string,
  strIngredient11?: string,
  strIngredient12?: string,
  strIngredient13?: string,
  strIngredient14?: string,
  strIngredient15?: string,
  strIngredient16?: string,
  strIngredient17?: string,
  strIngredient18?: string,
  strIngredient19?: string,
  strIngredient20?: string,
  strInstructions?: string,
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
  strMeasure16?: string;
  strMeasure17?: string;
  strMeasure18?: string;
  strMeasure19?: string;
  strMeasure20?: string;
  strYoutube?: string
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

export type RecipeDetailCardType = {
  index: number,
  foodRecipe?: MealsType,
  drinkRecipe?: DrinksType,
  recipe: {
    ingredients: string[],
    measures: string[],
  },
};

export const PAGETITLE = 'page-title';
