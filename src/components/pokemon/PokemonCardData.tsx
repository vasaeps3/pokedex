import React, { FunctionComponent } from 'react';
import { Table } from 'react-bootstrap';

import { PokemonType } from './PokemonType';
import { IPokemon } from '../../interfaces/pokemons.interface';


export const PokemonCardData: FunctionComponent<{ pokemon: IPokemon }> = ({ pokemon }) => {
  return (
    <div className="pokemon-card-data">
      <h5>Pokédex data</h5>
      <Table bordered={false} size="sm">
        <tbody>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{pokemon.types.map(t => <PokemonType type={t.type} />)}</td>
          </tr>
        </tbody>
      </Table>
    </div >
  )
};