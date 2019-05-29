import React, { FunctionComponent } from 'react';

import PokemonWeight from './PokemonWeight';
import PokemonHeight from './PokemonHeight';
import { PokemonType } from '../common/pokemon-type/PokemonType';
import { IPokemon } from '../../interfaces/pokemons.interface';
import PokedexTable from '../common/pokedex-table/PokedexTable';
import PokedexTableRow from '../common/pokedex-table/PokedexTableRow';
import PokedexTableCell from '../common/pokedex-table/PokedexTableCell';
import { PokemonAbility } from '../common/pokemon-ability/PokemonAbility';
import { toMultipleSymbol } from '../../utils/helper';


export const PokemonCardData: FunctionComponent<{ pokemon: IPokemon }> = ({ pokemon }) => {
  const pokedex_number = pokemon.species.pokedex_numbers.find(n => n.pokedex.name === 'national');
  return (
    <div className="pokemon-card-section">
      <h5>Pokédex data</h5>
      <PokedexTable>
        <PokedexTableRow>
          <PokedexTableCell>Name</PokedexTableCell>
          <PokedexTableCell>
            <div className="pokemon-card-pokemon-name">
              {pokemon.name}
            </div>
          </PokedexTableCell>
        </PokedexTableRow>
        <PokedexTableRow>
          <PokedexTableCell>National №</PokedexTableCell>
          <PokedexTableCell>{pokedex_number && toMultipleSymbol('' + pokedex_number.entry_number, 3)}</PokedexTableCell>
        </PokedexTableRow>
        <PokedexTableRow>
          <PokedexTableCell>Type</PokedexTableCell>
          <PokedexTableCell>
            <div className="pokemon-card-types-list">{pokemon.types.map((t, idx) => <PokemonType key={idx} type={t.type} />)}</div>
          </PokedexTableCell>
        </PokedexTableRow>
        <PokedexTableRow>
          <PokedexTableCell>Species</PokedexTableCell>
          <PokedexTableCell>{pokemon.species.title}</PokedexTableCell>
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
            <div className="pokemon-card-ability-list">{pokemon.abilities.map((a, idx) => <PokemonAbility key={idx} ability={a} />)}</div>
          </PokedexTableCell>
        </PokedexTableRow>
      </PokedexTable>
    </div >
  )
};