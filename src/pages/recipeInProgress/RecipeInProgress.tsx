import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import RecipeCardDetails from '../../components/details/RecipeDetailsCard';
import ContextRecipesApp from '../../context/user-context';

function RecipeInProgress() {
  const { id } = useParams();
  const {
    recipeDrink,
    recipeFood,
    recipe,
  } = useContext(ContextRecipesApp);
  return (
    <RecipeCardDetails
      key={ id }
      index={ Number(id) }
      foodRecipe={ recipeFood }
      drinkRecipe={ recipeDrink }
      recipe={ recipe }
    />
  );
}
export default RecipeInProgress;
