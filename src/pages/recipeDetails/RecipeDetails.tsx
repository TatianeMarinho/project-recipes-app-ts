import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useFetchRecipeDetails from '../../hooks/useFetchRecipeDetails';
import RecipeCardDetails from '../../components/details/RecipeDetailsCard';
import { DrinksType, MealsType } from '../../types/types';
import CarouselCard from '../../components/carousel/Carousel';
import shareIcon from '../../images/shareIcon.svg';
import './RecipeDetails.css';
import ContextRecipesApp from '../../context/user-context';
import useLocalStorage from '../../hooks/useLocalStorage';

function RecipesDetails() {
  const [recipeDrink, setRecipeDrink] = useState<DrinksType>();
  const [recipeFood, setRecipeFood] = useState<MealsType>();
  const [recomendadedDrinks, setRecomendadedDrinks] = useState<DrinksType[]>([]);
  const [recomendadedMeals, setRecomendadedMeals] = useState<MealsType[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const { id } = useParams();
  const { fetchDrinksDetails,
    fetchFoodDetails,
    fetchRecomendadedMeals,
    fetchRecomendadedDrinks } = useFetchRecipeDetails();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({
    ingredients: [''],
    measures: [''],
  });
  const navigate = useNavigate();
  const { favoriteRecipes, setFavoriteRecipes } = useContext(ContextRecipesApp);
  const localStorageFavorites = useLocalStorage('favoriteRecipes', '[]');

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

  const handleClick = () => {
    if (pathname === `/drinks/${id}`) {
      navigate(`/drinks/${id}/in-progress`);
    } else if (pathname === `/meals/${id}`) {
      navigate(`/meals/${id}/in-progress`);
    }
  };

  const handleShareClick = () => {
    setLinkCopied(true);
    if (pathname === `/drinks/${id}`) {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    } else if (pathname === `/meals/${id}`) {
      navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    }
    setTimeout(() => setLinkCopied(false), 1500);
  };

  const handleFavoriteClick = () => {
    if (pathname === `/drinks/${id}`) {
      const favoriteDrink = {
        id: recipeDrink?.idDrink,
        type: 'drink',
        category: recipeDrink?.strCategory,
        alcoholicOrNot: recipeDrink?.strAlcoholic,
        name: recipeDrink?.strDrink,
        nationality: '',
        image: recipeDrink?.strDrinkThumb,
      };
      setFavoriteRecipes([...favoriteRecipes, favoriteDrink]);
      localStorageFavorites
        .updateValue(JSON.stringify([...favoriteRecipes, favoriteDrink]));
    } else if (pathname === `/meals/${id}`) {
      const favoriteMeal = {
        id: recipeFood?.idMeal,
        type: 'meal',
        category: recipeFood?.strCategory,
        alcoholicOrNot: '',
        name: recipeFood?.strMeal,
        nationality: recipeFood?.strArea,
        image: recipeFood?.strMealThumb,
      };
      setFavoriteRecipes([...favoriteRecipes, favoriteMeal]);
      localStorageFavorites
        .updateValue(JSON.stringify([...favoriteRecipes, favoriteMeal]));
    }
  };

  return (
    <div>
      <div id="share-favorite-buttons">
        {linkCopied && (
          <p>
            Link copied!
          </p>)}
        <button
          data-testid="share-btn"
          className="share-recipe-btn"
          onClick={ handleShareClick }
        >
          <img src={ shareIcon } alt="Share icon" />
        </button>
        <button
          data-testid="favorite-btn"
          className="favorite-recipe-btn"
          onClick={ handleFavoriteClick }
        >
          Favorite
        </button>
      </div>
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
