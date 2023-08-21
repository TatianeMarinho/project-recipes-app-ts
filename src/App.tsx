import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Recipes from './pages/recipes/Recipes';
import RecipesDetails from './pages/recipeDetails/RecipeDetails';
import RecipeInProgress from './pages/recipeInProgress/RecipeInProgress';
import DoneRecipes from './pages/doneRecipes/DoneRecipes';
import FavoriteRecipes from './pages/favoriteRecipes/FavoriteRecipes';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Recipes /> } />
      <Route path="/drinks" element={ <Recipes /> } />
      <Route path="/meals/:id-da-receita" element={ <RecipesDetails /> } />
      <Route path="/drinks/:id-da-receita" element={ <RecipesDetails /> } />
      <Route path="/meals/:id-da-receita/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:id-da-receita/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/drinks/favorite-recipes" element={ <FavoriteRecipes /> } />
      <Route path="/drinks/profile" element={ <Profile /> } />
    </Routes>
  );
}

export default App;
