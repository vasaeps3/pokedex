import React, { FunctionComponent } from 'react';

import './PokemonChainInfo.scss';
import { IPokemonNew, IEvolutionDetails } from '../../utils/loading.service';
import { PokemonImg } from '../common/pokemon-img/PokemonImg';
import { PokemonType } from '../common/pokemon-type/PokemonType';


interface IAppProps {
  pokemon: IPokemonNew;
  evolutionDetails: IEvolutionDetails[];
}

const PokemonChainInfo: FunctionComponent<IAppProps> = ({ pokemon, evolutionDetails }) => {
  if (!pokemon) {
    return null;
  }
  const detail = evolutionDetails[0] && (
    <div className="pokemon-info-card-header">
      <span>({evolutionDetails[0].trigger.title}{evolutionDetails[0].item && ` ${evolutionDetails[0].item.title}`})</span>
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