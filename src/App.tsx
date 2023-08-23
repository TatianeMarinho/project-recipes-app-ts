import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Recipes from './pages/recipes/Recipes';
import RecipesDetails from './pages/recipeDetails/RecipeDetails';
import RecipeInProgress from './pages/recipeInProgress/RecipeInProgress';
import DoneRecipes from './pages/doneRecipes/DoneRecipes';
import FavoriteRecipes from './pages/favoriteRecipes/FavoriteRecipes';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Layout from './pages/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="" element={ <Layout /> }>
        <Route path="/meals" element={ <Recipes /> } />
        <Route path="/drinks" element={ <Recipes /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
      <Route path="/meals/:id-da-receita" element={ <RecipesDetails /> } />
      <Route path="/drinks/:id-da-receita" element={ <RecipesDetails /> } />
      <Route
        path="/meals/:id-da-receita/in-progress"
        element={ <RecipeInProgress /> }
      />
      <Route
        path="/drinks/:id-da-receita/in-progress"
        element={ <RecipeInProgress /> }
      />
    </Routes>
  );
}

export default App;
