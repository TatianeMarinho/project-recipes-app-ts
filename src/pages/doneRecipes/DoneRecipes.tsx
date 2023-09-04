import { useEffect, useState } from 'react';
import { DoneRecipesCardType } from '../../types/types';
import DoneRecipesCard from '../../components/doneRecipesCard/DoneRecipesCard';

function DoneRecipes() {
  const doneRecipesJSON = localStorage.getItem('doneRecipes');
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesCardType[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (doneRecipesJSON !== null) {
      const doneRecipesResult = JSON.parse(doneRecipesJSON);
      setDoneRecipes(doneRecipesResult);
    }
    setError('Não existe nada salvo');
  }, []);
  console.log(doneRecipesJSON);
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        (doneRecipes) && (
          doneRecipes.map((recipe, index) => (
            <DoneRecipesCard
              key={ recipe.id }
              recipe={ recipe }
              idx={ index }
            />
          ))
        )
      }
    </div>
  );
}
export default DoneRecipes;
