import { useEffect, useState } from 'react';
import { DoneRecipesCardType } from '../../types/types';
import DoneRecipesCard from '../../components/doneRecipesCard/DoneRecipesCard';

function DoneRecipes() {
  const doneRecipesJSON = localStorage.getItem('doneRecipes');
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipesCardType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<DoneRecipesCardType[]>([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (doneRecipesJSON !== null) {
      const doneRecipesResult = JSON.parse(doneRecipesJSON);
      setDoneRecipes(doneRecipesResult);
      setFilteredRecipes(doneRecipesResult);
    }
    setError('Não existe nada salvo');
  }, []);

  const handleFilterClick = (filterName: string) => {
    setFilter(filterName);
    if (filterName === 'All') return setFilteredRecipes(doneRecipes);
    const filtered = doneRecipes.filter((recipe) => recipe.type === filterName);
    setFilteredRecipes(filtered);
  };
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilterClick('All') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilterClick('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterClick('drink') }
      >
        Drinks
      </button>
      {filteredRecipes && (
        filteredRecipes.map((recipe, index) => (
          <DoneRecipesCard
            key={ recipe.id }
            recipe={ recipe }
            idx={ index }
          />
        ))
      )}
    </div>
  );
}
export default DoneRecipes;
