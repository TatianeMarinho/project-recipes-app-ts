import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useFetchRecipeDetails from '../../hooks/useFetchRecipeDetails';
import RecipeCardDetails from '../../components/details/RecipeDetailsCard';
import {
  DrinksType, MealsType,
} from '../../types/types';
import CarouselCard from '../../components/carousel/Carousel';
import './RecipeDetails.css';
import ButtonsCard from '../../components/buttonsCard/buttonsCard';
import ContextRecipesApp from '../../context/user-context';

function RecipesDetails() {
  const [recomendadedDrinks, setRecomendadedDrinks] = useState<DrinksType[]>([]);
  const [recomendadedMeals, setRecomendadedMeals] = useState<MealsType[]>([]);
  const { id } = useParams();
  const { fetchDrinksDetails,
    fetchFoodDetails,
    fetchRecomendadedMeals,
    fetchRecomendadedDrinks } = useFetchRecipeDetails();
  const {
    recipeFood, setRecipeFood,
    recipeDrink, setRecipeDrink,
    recipe, setRecipe,
  } = useContext(ContextRecipesApp);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined && pathname === `/drinks/${id}`) {
        const data = await fetchDrinksDetails(id);
        setRecipeDrink(data.drinks[0]);
        ingredientsAndMesures(data.drinks[0]);
        const result = await fetchRecomendadedMeals();
        setRecomendadedMeals(result.meals
          .filter((meal: MealsType, index: number) => (index < 6)
        && meal));
      }
      if (id !== undefined && pathname === `/meals/${id}`) {
        const data = await fetchFoodDetails(id);
        setRecipeFood(data[0]);
        ingredientsAndMesures(data[0]);
        const result = await fetchRecomendadedDrinks();
        setRecomendadedDrinks(result.drinks
          .filter((drink: DrinksType, index: number) => (index < 6)
        && drink));
      }
    };
    fetchData();
  }, [id]);

  const ingredientsAndMesures = (recipes: MealsType | DrinksType) => {
    if (recipes) {
      const measure = Object.entries(recipes as MealsType)
        .filter((entry) => entry[0]
          .includes('strMeasure') && entry[1] !== null && entry[1] !== '')
        .map((entry) => entry[1]);

      const ingredient = Object.entries(recipes as MealsType)
        .filter((entry) => entry[0]
          .includes('strIngredient') && entry[1] !== null && entry[1] !== '')
        .map((entry) => entry[1]);

      setRecipe({ ingredients: ingredient, measures: measure });
    }
  };
  console.log(recipe);
  const handleClick = () => {
    if (pathname === `/drinks/${id}`) {
      navigate(`/drinks/${id}/in-progress`);
    } else if (pathname === `/meals/${id}`) {
      navigate(`/meals/${id}/in-progress`);
    }
  };

  return (
    <div>
      <ButtonsCard
        pathname={ pathname }
        id={ id }
        recipeDrink={ recipeDrink }
        recipeFood={ recipeFood }
      />
      <RecipeCardDetails
        key={ id }
        index={ Number(id) }
        foodRecipe={ recipeFood }
        drinkRecipe={ recipeDrink }
        recipe={ recipe }
      />
      <CarouselCard
        drinksRecomendaded={ recomendadedDrinks }
        mealsRecomendaded={ recomendadedMeals }
      />
      <button
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ handleClick }
      >
        Start Recipe
      </button>

    </div>
  );
}
export default RecipesDetails;
