import React, { FunctionComponent } from 'react';

import { IPokemon } from '../../interfaces/pokemon.interface';
import PokedexTable from '../common/pokedex-table/PokedexTable';
import PokedexTableCell from '../common/pokedex-table/PokedexTableCell';
import PokedexTableRow from '../common/pokedex-table/PokedexTableRow';
import { PokemonAbility, PokemonHeight, PokemonWeight } from '../common/pokemon';
import { PokemonType } from '../common/pokemon/PokemonType';


export const PokemonCardData: FunctionComponent<{ pokemon: IPokemon }> = ({ pokemon }) => {
  const pokedexNumber = pokemon.species.pokedex_numbers.find((n) => n.pokedex.name === 'national');
  let nationalNumber = '';
  if (pokedexNumber) {
    nationalNumber = `${pokedexNumber.entry_number}`.padStart(3, '0');
  }
  return (
    <div className="pokemon-card-section">
      <h5>Pokédex data</h5>
      <PokedexTable>
        <PokedexTableRow>
          <PokedexTableCell>Name</PokedexTableCell>
          <PokedexTableCell>
            <div className="pokemon-card-pokemon-name">{pokemon.species.title}</div>
          </PokedexTableCell>
        </PokedexTableRow>
        <PokedexTableRow>
          <PokedexTableCell>National №</PokedexTableCell>
          <PokedexTableCell>{nationalNumber}</PokedexTableCell>
        </PokedexTableRow>
        <PokedexTableRow>
          <PokedexTableCell>Type</PokedexTableCell>
          <PokedexTableCell>
            <div className="pokemon-card-types-list">
              {pokemon.types.map((t, idx) => <PokemonType key={idx} type={t.type} />)}
            </div>
          </PokedexTableCell>
        </PokedexTableRow>
        <PokedexTableRow>
          <PokedexTableCell>Species</PokedexTableCell>
          <PokedexTableCell>{pokemon.species.generaTitle}</PokedexTableCell>
        </PokedexTableRow>
        <PokedexTableRow>
          <PokedexTableCell>Height</PokedexTableCell>
          <PokedexTableCell>
            <PokemonHeight height={pokemon.height} />
          </PokedexTableCell>
        </PokedexTableRow>
        <PokedexTableRow>
          <PokedexTableCell>Weight</PokedexTableCell>
          <PokedexTableCell>
            <PokemonWeight weight={pokemon.weight} />
          </PokedexTableCell>
        </PokedexTableRow>
        <PokedexTableRow>
          <PokedexTableCell>Abilities</PokedexTableCell>
          <PokedexTableCell>
            <div className="pokemon-card-ability-list">
              {pokemon.abilities.map((a, idx) => <PokemonAbility key={idx} ability={a} />)}
            </div>
          </PokedexTableCell>
        </PokedexTableRow>
      </PokedexTable>
    </div >
  );
};
