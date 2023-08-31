import { useLocation, useParams } from 'react-router-dom';
import RecipeCardDetails from '../../components/details/RecipeDetailsCard';
import ButtonsCard from '../../components/buttonsCard/buttonsCard';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();

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
