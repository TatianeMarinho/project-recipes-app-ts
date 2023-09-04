import { useState } from 'react';
import { DoneRecipesCardType } from '../../types/types';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipesCard(recipe: DoneRecipesCardType, idx: number) {
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
          data-testid="share-btn"
          className={ `${idx}-horizontal-share-btn` }
          onClick={ handleShareClick }
        >
          <img src={ shareIcon } alt="Share icon" />
        </button>
      </div>
      <h1 data-testid={ `${idx}-horizontal-name` }>{name}</h1>
      <h3 data-testid={ `${idx}-horizontal-top-text` }>{category}</h3>
      <h4 data-testid={ `${idx}-horizontal-done-date` }>{doneDate}</h4>
      <ul>
        {
            tags.map((tag, index) => (
              <li
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </li>
            ))
}
      </ul>
      <img
        src={ image }
        alt={ `${name} figura` }
        data-testid={ `${idx}-horizontal-image` }
      />
    </div>
  );
}

export default DoneRecipesCard;
