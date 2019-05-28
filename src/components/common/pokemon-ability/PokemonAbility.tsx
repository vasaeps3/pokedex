import React, { FunctionComponent } from 'react';

import './PokemonAbility.scss';
import { IAbilityPokemon } from '../../../interfaces/pokemons.interface';


export const PokemonAbility: FunctionComponent<{ ability: IAbilityPokemon }> = ({ ability }) => {
  return (
    <div className="ability-label">{ability.title}{ability.is_hidden ? <span className="text-muted"> (hidden ability)</span> : null}</div>
  );
};
