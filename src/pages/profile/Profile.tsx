import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem('user') as string;
  const parsedEmail = JSON.parse(storedEmail);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <h1>PROFILE</h1>
      <h2
        data-testid="profile-email"
      >
        { parsedEmail.email }
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
