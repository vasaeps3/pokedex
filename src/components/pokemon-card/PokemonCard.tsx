import React, { FunctionComponent, Fragment } from 'react';

import './PokemonCard.scss';
import { PokemonImg } from '../common/pokemon-img/PokemonImg';
import { PokemonCardStats } from './PokemonCardStats';
import { PokemonCardData } from './PokemonCardData';
import { IPokemon, ISpecies } from '../../interfaces/pokemon.interface';

interface IAppProps {
  pokemon: IPokemon;
  handleClick: (evolution_chain: ISpecies['evolution_chain']) => void;
}

const PokemonCard: FunctionComponent<IAppProps> = (props) => {

  const handleClick = () => {
    props.handleClick(pokemon.species.evolution_chain);
  }

  const { pokemon } = props;
  return (
    <div className="col-12 col-lg-6">
      <div className="pokemon-card" onClick={handleClick}>
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
        <PokemonImg sprites={pokemon.sprites} />
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
