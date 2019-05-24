import React, { FunctionComponent } from 'react';
import { Carousel } from 'react-bootstrap';
import * as _ from 'lodash';

import { IPokemon } from '../../interfaces/pokemons.interface';

export const PokemonCardImg: FunctionComponent<{ pokemon: IPokemon }> = ({ pokemon }) => {
  const imgArray = _.toArray(pokemon.sprites).filter(img => img);

  return (
    <div className="pokemon-card-img">
      <Carousel fade={true} interval={null as any} slide={false}>
        {imgArray.map((img,idx) => (
          <Carousel.Item key={idx}>
            <img
              src={img}
              alt={pokemon.name}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div >
  )
};