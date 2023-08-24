import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const { fetchFood } = useFetch();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSelectedFilter(value);
  };

  const handleClick = () => {
    fetchFood(searchInput, selectedFilter);
    setSearchInput('');
  };

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
        onClick={ handleClick }
      >
        SEARCH
      </button>
    </form>
  );
}
export default SearchBar;
