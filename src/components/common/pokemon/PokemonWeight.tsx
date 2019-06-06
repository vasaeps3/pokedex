import React, { Fragment, FunctionComponent } from 'react';

import { IPokemon } from '../../../interfaces/pokemon.interface';


export const PokemonWeight: FunctionComponent<{ weight: IPokemon['weight'] }> = ({ weight }) => {
  return (
    <Fragment>{Math.round(weight * 2.205) / 10} lbs ({weight / 10} kg)</Fragment>
  );
};
