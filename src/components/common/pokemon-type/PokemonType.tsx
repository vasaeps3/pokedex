import React, { FunctionComponent } from 'react';

import './PokemonType.scss';
import { ITypePokemonNew } from '../../../interfaces/pokemon.interface';
import { ColorTypePokemon } from '../../../interfaces/type-pokemon.enum';


export const PokemonType: FunctionComponent<{ type: ITypePokemonNew['type'] }> = ({ type }) => {
  const typeStyle = {
    backgroundColor: ColorTypePokemon[type.name],
  }

  return (
    <div className="type-label" style={typeStyle}>{type.name}</div>
  );
};
