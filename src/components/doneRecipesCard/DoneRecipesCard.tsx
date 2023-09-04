import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DoneRecipesCardPropsType } from '../../types/types';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipesCard(props: DoneRecipesCardPropsType) {
  const { recipe, idx } = props;
  const { alcoholicOrNot, category,
    doneDate, id, image, name, nationality, tags, type } = recipe;

  const [linkCopied, setLinkCopied] = useState(false);

  const handleShareClick = () => {
    setLinkCopied(true);
    if (type === 'drink') {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    } else if (type === 'meal') {
      navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    }
    setTimeout(() => setLinkCopied(false), 1500);
  };

  return (
    <div data-testid={ `${idx}-done-recipe-card` }>
      <div className="btn-share">
        {linkCopied && (
          <p>
            Link copied!
          </p>)}
        <button
          onClick={ handleShareClick }
        >
          <img
            src={ shareIcon }
            alt="Share icon"
            data-testid={ `${idx}-horizontal-share-btn` }
          />
        </button>
      </div>
      <Link
        key={ `name-link-${id}` }
        to={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }
      >
        <h1 data-testid={ `${idx}-horizontal-name` }>{name}</h1>
      </Link>
      <h3 data-testid={ `${idx}-horizontal-top-text` }>
        {alcoholicOrNot || `${nationality} - ${category}`}
      </h3>
      <h4 data-testid={ `${idx}-horizontal-done-date` }>{doneDate}</h4>
      {tags && (
        <ul>
          {tags.map((tag) => (
            <li
              key={ tag }
              data-testid={ `${idx}-${tag}-horizontal-tag` }
            >
              {tag}
            </li>
          ))}
        </ul>)}
      <Link
        key={ `image-link-${id}` }
        to={ type === 'meal' ? `/meals/${id}` : `/drinks/${id}` }
      >
        <img
          src={ image }
          alt={ `${name} figura` }
          data-testid={ `${idx}-horizontal-image` }
        />
      </Link>
    </div>
  );
}

export default DoneRecipesCard;
