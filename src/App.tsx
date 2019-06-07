import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header/Header';
import PokedexPage from './components/pages/pokedex/PokedexPage';
import PokemonDetails from './components/pages/pokemon-details/PokemonDetails';


const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Header />
      <ToastContainer position="top-center" />
      <div className="page">
        <Switch>
          <Route exact={true} path="/" component={PokedexPage} />
          <Route exact={true} path="/:pokemonName" component={PokemonDetails} />
          <Route render={() => <h1>Pаge not Found</h1>} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
