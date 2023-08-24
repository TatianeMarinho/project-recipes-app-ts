import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <button onClick={ () => navigate('/drinks') }>
        <img
          src={ drinkIcon }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button onClick={ () => navigate('/meals') }>
        <img
          src={ mealIcon }
          alt="meal icon"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}
export default Footer;
