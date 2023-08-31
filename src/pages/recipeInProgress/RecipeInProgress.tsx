import { useLocation, useParams } from 'react-router-dom';
import { useContext } from 'react';
import RecipeCardDetails from '../../components/details/RecipeDetailsCard';
import ButtonsCard from '../../components/buttonsCard/buttonsCard';
import ContextRecipesApp from '../../context/user-context';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const {
    recipeFood, setRecipeFood, recipeDrink, setRecipeDrink, recipe, setRecipe,
  } = useContext(ContextRecipesApp);

  return (
    <>
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
    </>
  );
}
export default RecipeInProgress;
