import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import RecipeCardDetails from '../../components/details/RecipeDetailsCard';
import { DrinksType, MealsType } from '../../types/types';

function RecipesDetails() {
  const [recipeDrink, setRecipeDrink] = useState<DrinksType>();
  const [recipeFood, setRecipeFood] = useState<MealsType>();
  const { id } = useParams();
  const { fetchDrinksDetails, fetchFoodDetails } = useFetch();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined && pathname === `/drinks/${id}`) {
        const data = await fetchDrinksDetails(id);
        console.log(data.drinks);
        setRecipeDrink(data.drinks[0]);
      }
      if (id !== undefined && pathname === `/meals/${id}`) {
        const data = await fetchFoodDetails(id);
        console.log(data);
        setRecipeFood(data[0]);
      }
    };
    fetchData();
  }, [id, fetchDrinksDetails, fetchFoodDetails, pathname]);

  return (
    <RecipeCardDetails
      key={ id }
      index={ Number(id) }
      foodRecipe={ recipeFood }
      drinkRecipe={ recipeDrink }
    />
  );
}
export default RecipesDetails;
