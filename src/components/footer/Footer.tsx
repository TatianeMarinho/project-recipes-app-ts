import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

function Footer() {
  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <button>
        <img
          src={ drinkIcon }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button>
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
