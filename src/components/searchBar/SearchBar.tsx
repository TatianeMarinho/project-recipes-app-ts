import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ContextRecipesApp from '../../context/user-context';

function SearchBar() {
  const { fetchedDrinks, fetchedFood } = useContext(ContextRecipesApp);
  const [searchInput, setSearchInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const { fetchFood, fetchDrinks } = useFetch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSelectedFilter(value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (pathname === '/drinks') {
      fetchDrinks(searchInput, selectedFilter);
    } else {
      fetchFood(searchInput, selectedFilter);
    }
    setSearchInput('');
  };

  useEffect(() => {
    if (fetchedDrinks && fetchedDrinks.length === 1) {
      return navigate(`/drinks/${fetchedDrinks[0].idDrink}`);
    }
    if (fetchedFood && fetchedFood.length === 1) {
      return navigate(`/meals/${fetchedFood[0].idMeal}`);
    }
  }, [fetchedDrinks, fetchedFood, pathname, navigate]);

  return (
    <form>
      <input
        data-testid="search-input"
        name="search"
        placeholder="Search"
        type="text"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          name="searchOption"
          type="radio"
          value="ingredient"
          onChange={ handleChange }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          name="name"
          type="radio"
          value="name"
          onChange={ handleChange }
        />
        Name
      </label>
      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          name="firstLetter"
          type="radio"
          value="firstLetter"
          onChange={ handleChange }
        />
        First letter
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ (e) => handleClick(e) }
      >
        SEARCH
      </button>
    </form>
  );
}
export default SearchBar;
