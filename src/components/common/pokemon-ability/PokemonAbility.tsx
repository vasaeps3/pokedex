import React, { FunctionComponent } from 'react';

import './PokemonAbility.scss';
import { IAbility } from '../../../utils/loading.service';


export const PokemonAbility: FunctionComponent<{ ability: IAbility }> = ({ ability }) => {
  return (
    <div className="ability-label">{ability.ability.title}{ability.is_hidden ? <span className="text-muted"> (hidden ability)</span> : null}</div>
  );
};
