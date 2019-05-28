import React, { FunctionComponent, Fragment } from 'react';

import './PokemonCard.scss';
import { IPokemon } from '../../interfaces/pokemons.interface';
import { PokemonCardImg } from './PokemonCardImg';
import { PokemonCardData } from './PokemonCardData';
import { PokemonCardStats } from './PokemonCardStats';


const PokemonCard: FunctionComponent<{ pokemon: IPokemon }> = ({ pokemon }) => {
  return (
    <div className="col-12 col-lg-6">
      <div className="pokemon-card">
        <Pokemon pokemon={pokemon} />
      </div>
    </div>
  );
}
export default PokemonCard;

const Pokemon: FunctionComponent<{ pokemon: IPokemon }> = ({ pokemon }) => (
  <Fragment>
    <div className="pokemon-card-info row">
      <div className="col-12 col-sm-4 col-md-5 col-lg-4 col-xl-5">
        <PokemonCardImg pokemon={pokemon} />
      </div>
      <div className="col-12 col-sm-8 col-md-7 col-lg-8 col-xl-7">
        <PokemonCardData pokemon={pokemon} />
      </div>
    </div>
    <div className="pokemon-card-stats">
      <PokemonCardStats stats={pokemon.stats} />
    </div>
  </Fragment>
);
