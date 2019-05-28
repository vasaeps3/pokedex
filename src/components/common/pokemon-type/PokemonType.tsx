import React, { FunctionComponent } from 'react';

import './PokemonType.scss';
import { ITypePokemon } from '../../../interfaces/pokemons.interface';
import { ColorTypePokemon } from '../../../interfaces/typePokemon.enum';


export const PokemonType: FunctionComponent<{ type: ITypePokemon['type'] }> = ({ type }) => {
  const typeStyle = {
    backgroundColor: ColorTypePokemon[type.name],
  }

  return (
    <div className="type-label" style={typeStyle}>{type.name}</div>
  );
};
