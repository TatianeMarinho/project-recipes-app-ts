import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

function RecipesDetails() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const { fetchDrinksDetails, fetchFoodDetails } = useFetch();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined && pathname === `/drinks/${id}`) {
        const data = await fetchDrinksDetails(id);
        setRecipe(data);
      }
      if (id !== undefined && pathname === `/meals/${id}`) {
        const data = fetchFoodDetails(id);
        setRecipe(data);
      }
    };
    fetchData();
  }, [id, recipe]);

  return (
    <h1>{`Recipes details ${id}`}</h1>
  );
}
export default RecipesDetails;
