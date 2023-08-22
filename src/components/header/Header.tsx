import { useState } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import SearchBar from '../searchBar/SearchBar';

function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header>
      <img src={ profileIcon } alt="icone de perfil" />
      <button
        onClick={ () => setShowSearchBar(!showSearchBar) }
        data-testid="search-top-btn"
      >
        <img src={ searchIcon } alt="icone de pesquisa" />
      </button>
      { showSearchBar && <SearchBar />}
    </header>
  );
}
export default Header;
