import React, { FunctionComponent } from 'react';
import "react-toastify/dist/ReactToastify.css";

import Header from './components/layout/Header';
import PokedexPage from './components/pokedex/PokedexPage';
import { ToastContainer } from 'react-toastify';


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
}

export default App;
