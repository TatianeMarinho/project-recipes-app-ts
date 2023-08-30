function useFetchRecipeDetails() {
  const fetchDrinksDetails = async (id: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data;
  };

  const fetchFoodDetails = async (id: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals;
  };

  const fetchRecomendadedDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  };

  const fetchRecomendadedMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  };

  return {
    fetchDrinksDetails,
    fetchFoodDetails,
    fetchRecomendadedDrinks,
    fetchRecomendadedMeals,
  };
}

export default useFetchRecipeDetails;
