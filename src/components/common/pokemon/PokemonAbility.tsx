import React, { FunctionComponent } from 'react';

import { IAbility } from '../../../interfaces/pokemon.interface';
import './PokemonAbility.scss';


export const PokemonAbility: FunctionComponent<{ ability: IAbility }> = ({ ability }) => {
  const isHidden = ability.is_hidden && (<span className="text-muted"> (hidden ability)</span>);

  return (
    <div className="ability-label">{ability.ability.title}{isHidden}</div>
  );
};
