import React, { FunctionComponent } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header/Header';
import PokedexPage from './components/pokedex/PokedexPage';


const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Header />
      <div className="page">
        <ToastContainer position="top-center" />
        <PokedexPage />
      </div>
    </div>
  );
};

export default App;
