import React, { FunctionComponent } from 'react';

import PokedexPage from './components/pokedex/PokedexPage';
import Header from './components/layout/Header';


const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Header />
      <div className="page">
        <PokedexPage />
      </div>
    </div>
  );
}

export default App;
