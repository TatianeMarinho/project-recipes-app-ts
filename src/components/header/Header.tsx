import { useLocation } from 'react-router-dom';

function Header() {
  const { pathname } = useLocation();
  return (
    <header>
      {
        pathname === '/meals' && (
          <>
            <h1 data-testid="page-title">Meals</h1>
            <img
              alt="icone de perfil"
              data-testid="profile-top-btn"
              src="/src/images/profileIcon.svg"
            />
            <img
              alt="icone de pesquisa"
              data-testid="search-top-btn"
              src="/src/images/searchIcon.svg"
            />
          </>
        )
}
      {
  pathname === '/drinks' && (
    <>
      <h1 data-testid="page-title">Drinks</h1>
      <img
        alt="icone de perfil"
        data-testid="profile-top-btn"
        src="/src/images/profileIcon.svg"
      />
      <img
        alt="icone de pesquisa"
        data-testid="search-top-btn"
        src="/src/images/searchIcon.svg"
      />
    </>
  )
}
      {
  pathname === '/profile' && (
    <>
      <h1 data-testid="page-title">Profile</h1>
      <img
        alt="icone de perfil"
        data-testid="profile-top-btn"
        src="/src/images/profileIcon.svg"
      />
    </>
  )
}
      {
  pathname === '/done-recipes' && (
    <>
      <h1 data-testid="page-title">Done Recipes</h1>
      <img
        alt="icone de perfil"
        data-testid="profile-top-btn"
        src="/src/images/profileIcon.svg"
      />
    </>
  )
}
      {
  pathname === '/favorite-recipes' && (
    <>
      <h1 data-testid="page-title">Favorite Recipes</h1>
      <img
        alt="icone de perfil"
        data-testid="profile-top-btn"
        src="/src/images/profileIcon.svg"
      />
    </>
  )
}
    </header>
  );
}
export default Header;
