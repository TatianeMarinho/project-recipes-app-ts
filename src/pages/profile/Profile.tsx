import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextRecipesApp from '../../context/user-context';
import { InputsLoginTypes } from '../../types/types';

function Profile() {
  const navigate = useNavigate();
  const { setLogin } = useContext(ContextRecipesApp);

  const clearLogin = {
    email: '',
  };

  const getEmail = () => {
    const storedEmail = localStorage.getItem('user') as string;
    if (storedEmail) {
      const parsedEmail = JSON.parse(storedEmail) as InputsLoginTypes;
      const savedEmail = parsedEmail.email as string;
      return savedEmail;
    }
  };

  const email = getEmail();

  const handleLogout = () => {
    localStorage.clear();
    setLogin(clearLogin);
    navigate('/');
  };

  return (
    <>
      <h1>PROFILE</h1>
      <h2
        data-testid="profile-email"
      >
        { email }
      </h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => navigate('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleLogout }
      >
        Logout
      </button>
    </>
  );
}
export default Profile;
