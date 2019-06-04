import React, { FunctionComponent, Fragment } from 'react';

import { toMultipleSymbol } from '../../utils/helper';
import { IPokemon } from '../../interfaces/pokemon.interface';


const PokemonHeight: FunctionComponent<{ height: IPokemon['height'] }> = ({ height }) => {
  const ft = Math.trunc(height * 10 / 30.48);
  const inch = Math.round((height * 10 % 30.48) / 2.54);
  return (
    <Fragment>{ft}'{toMultipleSymbol('' + inch)}'' ({(height / 10).toFixed(1)} m)</Fragment>
  );
};

export default PokemonHeight;

