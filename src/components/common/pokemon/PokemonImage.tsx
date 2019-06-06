import React, { Fragment, FunctionComponent } from 'react';
import { Image } from 'react-bootstrap';

import { ISprites } from '../../../interfaces/pokemon.interface';


export const PokemonImage: FunctionComponent<{ sprites: ISprites }> = ({ sprites }) => {
  return (
    <Fragment>
      {sprites.front_default && <Image src={sprites.front_default} fluid={true} />}
    </Fragment>
  );
};
