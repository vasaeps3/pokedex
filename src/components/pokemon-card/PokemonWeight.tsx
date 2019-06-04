import React, { FunctionComponent, Fragment } from 'react';

import { IPokemon } from '../../interfaces/pokemons.interface';


const PokemonWeight: FunctionComponent<{ weight: IPokemon['weight'] }> = ({ weight }) => {
  return (
    <Fragment>{Math.round(weight * 2.205) / 10} lbs ({weight / 10} kg)</Fragment>
  );
};

export default PokemonWeight;