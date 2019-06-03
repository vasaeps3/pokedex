import React, { FunctionComponent, Fragment } from 'react';
import { Image } from 'react-bootstrap'

import { IPokemon } from '../../interfaces/pokemons.interface';


export const PokemonCardImg: FunctionComponent<{ pokemon: IPokemon }> = ({ pokemon }) => {
  return (
    <Fragment>
      {pokemon.sprites.front_default && <Image src={pokemon.sprites.front_default} fluid />}
    </Fragment>
  )
};