import { useEffect, useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { ButtonsCardType, FavoriteRecipeType } from '../../types/types';
import useLocalStorage from '../../hooks/useLocalStorage';

function ButtonsCard({ pathname, id, recipeDrink, recipeFood }: ButtonsCardType) {
  const [linkCopied, setLinkCopied] = useState(false);

  const localStorageFavorites = useLocalStorage('favoriteRecipes', '[]');
  const [isFavorite, setIsFavorite] = useState<boolean>(!!JSON
    .parse(localStorageFavorites.value)
    .find((favoriteRecipe: FavoriteRecipeType) => favoriteRecipe.id === id));
  const [favoriteRecipes, setFavoriteRecipes] = useState(JSON
    .parse(localStorageFavorites.value));

  const handleShareClick = () => {
    setLinkCopied(true);
    if (pathname === `/drinks/${id}`) {
      navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    } else if (pathname === `/meals/${id}`) {
      navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    }
    setTimeout(() => setLinkCopied(false), 1500);
  };

  useEffect(() => {
    const isFavoriteFind = JSON
      .parse(localStorageFavorites.value)
      .find((favoriteRecipe: FavoriteRecipeType) => favoriteRecipe.id === id);
    setIsFavorite(!!isFavoriteFind);
  }, [id, localStorageFavorites.value]);

  const handleFavoriteClick = () => {
    if (pathname === `/drinks/${id}`) {
      const favoriteDrink = {
        id: recipeDrink?.idDrink,
        type: 'drink',
        category: recipeDrink?.strCategory,
        alcoholicOrNot: recipeDrink?.strAlcoholic,
        name: recipeDrink?.strDrink,
        nationality: '',
        image: recipeDrink?.strDrinkThumb,
      };
      if (isFavorite) {
        const newFavoriteRecipes = favoriteRecipes
          .filter((favoriteRecipe: FavoriteRecipeType) => favoriteRecipe.id !== id);
        setFavoriteRecipes(newFavoriteRecipes);
        localStorageFavorites
          .updateValue(JSON.stringify(newFavoriteRecipes));
        setIsFavorite(false);
        return;
      }
      setFavoriteRecipes([...favoriteRecipes, favoriteDrink]);
      localStorageFavorites
        .updateValue(JSON.stringify([...favoriteRecipes, favoriteDrink]));
    } else if (pathname === `/meals/${id}`) {
      const favoriteMeal = {
        id: recipeFood?.idMeal,
        type: 'meal',
        category: recipeFood?.strCategory,
        alcoholicOrNot: '',
        name: recipeFood?.strMeal,
        nationality: recipeFood?.strArea,
        image: recipeFood?.strMealThumb,
      };
      if (isFavorite) {
        const newFavoriteRecipes = favoriteRecipes
          .filter((favoriteRecipe: FavoriteRecipeType) => favoriteRecipe.id !== id);
        setFavoriteRecipes(newFavoriteRecipes);
        localStorageFavorites
          .updateValue(JSON.stringify(newFavoriteRecipes));
        setIsFavorite(false);
        return;
      }
      setFavoriteRecipes([...favoriteRecipes, favoriteMeal]);
      localStorageFavorites
        .updateValue(JSON.stringify([...favoriteRecipes, favoriteMeal]));
    }
  };

  return (
    <div className="share-favorite-buttons">
      {linkCopied && (
        <p>
          Link copied!
        </p>)}
      <button
        data-testid="share-btn"
        className="share-recipe-btn"
        onClick={ handleShareClick }
      >
        <img src={ shareIcon } alt="Share icon" />
      </button>
      <button
        type="button"
        className="favorite-recipe-btn"
        onClick={ handleFavoriteClick }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite icon"
        />
      </button>
    </div>
  );
}
export default ButtonsCard;
