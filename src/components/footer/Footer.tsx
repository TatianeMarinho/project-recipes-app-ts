import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

function Footer() {
  return (
    <footer id="footer" data-testid="footer">
      <button>
        <img
          src={ drinkIcon }
          alt="butao de drink"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button>
        <img
          src={ mealIcon }
          alt="icone de drink"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}
export default Footer;
