import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import SearchBar from '../searchBar/SearchBar';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <header>
      {
        pathname === '/meals' && (
          <>
            <h1 data-testid="page-title">Meals</h1>
            <button onClick={ () => navigate('/profile') }>
              <img
                alt="icone de perfil"
                data-testid="profile-top-btn"
                src={ profileIcon }
              />
            </button>
            <button
              onClick={ () => setShowSearchBar(!showSearchBar) }
            >
              <img
                src={ searchIcon }
                alt="icone de pesquisa"
                data-testid="search-top-btn"
              />
            </button>
          </>
        )
}
      {
  pathname === '/drinks' && (
    <>
      <h1 data-testid="page-title">Drinks</h1>
      <button onClick={ () => navigate('/profile') }>
        <img
          alt="icone de perfil"
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </button>
      <img
        alt="icone de pesquisa"
        data-testid="search-top-btn"
        src={ searchIcon }
      />
    </>
  )
}
      {
  pathname === '/profile' && (
    <>
      <h1 data-testid="page-title">Profile</h1>
      <button onClick={ () => navigate('/profile') }>
        <img
          alt="icone de perfil"
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </button>
    </>
  )
}
      {
  pathname === '/done-recipes' && (
    <>
      <h1 data-testid="page-title">Done Recipes</h1>
      <button onClick={ () => navigate('/profile') }>
        <img
          alt="icone de perfil"
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </button>
    </>
  )
}
      {
  pathname === '/favorite-recipes' && (
    <>
      <h1 data-testid="page-title">Favorite Recipes</h1>
      <button onClick={ () => navigate('/profile') }>
        <img
          alt="icone de perfil"
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </button>
    </>
  )
}
      {
        showSearchBar && <SearchBar />
      }
    </header>
  );
}
export default Header;
