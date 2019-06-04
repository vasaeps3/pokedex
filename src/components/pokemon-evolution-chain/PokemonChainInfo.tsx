import React, { FunctionComponent } from 'react';

import './PokemonChainInfo.scss';
import { PokemonImg } from '../common/pokemon-img/PokemonImg';
import { PokemonType } from '../common/pokemon-type/PokemonType';
import { IPokemon, IEvolutionDetails } from '../../interfaces/pokemon.interface';


interface IAppProps {
  pokemon: IPokemon;
  evolutionDetails: IEvolutionDetails[];
}

const PokemonChainInfo: FunctionComponent<IAppProps> = ({ pokemon, evolutionDetails }) => {
  if (!pokemon) {
    return null;
  }

  const evDetails = evolutionDetails[0];

  let triggerItemName = '';
  if (evDetails) {
    if (evDetails.trigger.name === 'use-item') {
      triggerItemName = evDetails.item && evDetails.item.title;
    }

    if (evDetails.trigger.name === 'trade') {
      triggerItemName = evDetails.held_item && evDetails.held_item.title;
    }
  }

  const detail = evDetails && (
    <div className="pokemon-info-card-header">
      <span>({evDetails.trigger.title}{triggerItemName && ` ${triggerItemName}`})</span>
    </div>
  );

  return (
    <div className="pokemon-info-card">
      {detail}
      <div className="pokemon-info-card-img"><PokemonImg sprites={pokemon.sprites} /></div>
      <div className="pokemon-info-card-name">{pokemon.species.title}</div>
      <div className="pokemon-info-card-types-list">
        {pokemon.types.map((t, idx) => <PokemonType type={t.type} key={idx} />)}
      </div>
    </div >
  );
};

export default PokemonChainInfo;