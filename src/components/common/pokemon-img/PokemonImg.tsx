import React, { FunctionComponent, Fragment } from 'react';
import { Image } from 'react-bootstrap'

import { ISprites } from '../../../interfaces/pokemon.interface';


export const PokemonImg: FunctionComponent<{ sprites: ISprites }> = ({ sprites }) => {
  return (
    <Fragment>
      {sprites.front_default && <Image src={sprites.front_default} fluid />}
    </Fragment>
  )
};