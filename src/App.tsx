import React, { FunctionComponent } from 'react';

import PokedexPage from './components/pokedex/PokedexPage';
import Header from './components/layout/Header';


const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Header />
      <PokedexPage />
    </div>
  );
}

export default App;
