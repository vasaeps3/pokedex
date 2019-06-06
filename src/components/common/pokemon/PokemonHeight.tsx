import React, { Fragment, FunctionComponent } from 'react';

import { IPokemon } from '../../../interfaces/pokemon.interface';


export const PokemonHeight: FunctionComponent<{ height: IPokemon['height'] }> = ({ height }) => {
  const ft = Math.trunc(height * 10 / 30.48);
  const inch = Math.round((height * 10 % 30.48) / 2.54);

  return (
    <Fragment>{ft}'{`${inch}`.padStart(2, '0')}'' ({(height / 10).toFixed(1)} m)</Fragment>
  );
};
