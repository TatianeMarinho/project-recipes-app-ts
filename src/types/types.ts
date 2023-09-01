export type UseContextType = {
  login: InputsLoginTypes;
  setLogin: React.Dispatch<React.SetStateAction<InputsLoginTypes>>;
  fetchedDrinks: DrinksType[];
  setFetchedDrinks: (value: any) => void;
  fetchedFood: MealsType[];
  setFetchedFood: (value: any) => void;
  favoriteRecipes: FavoriteRecipeType[];
  setFavoriteRecipes: (value: any) => void;
  recipeDrink: DrinksType | undefined;
  setRecipeDrink: React.Dispatch<React.SetStateAction<DrinksType | undefined>>
  recipeFood: MealsType | undefined;
  setRecipeFood: React.Dispatch<React.SetStateAction<MealsType | undefined>>
  recipe: { ingredients: string[];measures: string[]; };
  setRecipe: React.Dispatch<React.SetStateAction<{ ingredients: string[];
    measures: string[]; }>>
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
  strCategory: string,
  strArea: string,
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

export const DRINK_INICIAL_STATE = {
  idDrink: '',
  strDrink: '',
  strCategory: '',
  strArea: '',
  strDrinkThumb: '',
};

export type MealsType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
  strCategory?: string,
  strArea: string,
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

export const MEALS_INICIAL_STATE = {
  idMeal: '',
  strMeal: '',
  strMealThumb: '',
  strArea: '',
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

export type FoodCategory = {
  strCategory: string;
};

export type FoodCategories = {
  meals: FoodCategory[];
};

export type DrinkCategory = {
  strCategory: string;
};

export type DrinkCategories = {
  drinks: DrinkCategory[];
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

export type FavoriteRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot?: string,
  name: string,
  image: string,
};

export const PAGETITLE = 'page-title';

export const INITIAL_RECIPE_STATE = {
  ingredients: [''],
  measures: [''],
};

export type RecipeState = {
  ingredients: string[];
  measures: string[];
};

export type ButtonsCardType = {
  pathname: string;
  id:string | undefined;
  recipeDrink: DrinksType | undefined;
  recipeFood: MealsType | undefined;
};

export type IsCheckedState = {
  [index:number]: boolean
};
