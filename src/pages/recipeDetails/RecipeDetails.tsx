import { useParams } from 'react-router-dom';

function RecipesDetails() {
  const { id } = useParams();
  return (
    <h1>{`Recipes details ${id}`}</h1>
  );
}
export default RecipesDetails;
