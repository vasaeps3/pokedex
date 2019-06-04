import React, { FunctionComponent, Fragment } from 'react';

import { IPokemon } from '../../interfaces/pokemons.interface';
import { toMultipleSymbol } from '../../utils/helper';


const PokemonHeight: FunctionComponent<{ height: IPokemon['height'] }> = ({ height }) => {
  const ft = Math.trunc(height * 10 / 30.48);
  const inch = Math.round((height * 10 % 30.48) / 2.54);
  return (
    <Fragment>{ft}'{toMultipleSymbol('' + inch)}'' ({(height / 10).toFixed(1)} m)</Fragment>
  );
};

export default PokemonHeight;

