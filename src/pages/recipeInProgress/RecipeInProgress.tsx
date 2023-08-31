import { useParams } from 'react-router-dom';

function RecipeInProgress() {
  const { id } = useParams();
  return (
    <h1>{`RecipeInProgress ${id}`}</h1>
  );
}
export default RecipeInProgress;
