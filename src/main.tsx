import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RecipesAppProvider from './context/user-provider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>
    </BrowserRouter>,

  );
