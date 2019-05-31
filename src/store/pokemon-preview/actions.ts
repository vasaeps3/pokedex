import { map, asc } from 'type-comparator';
import { Dispatch } from 'redux';

import httpService from '../../utils/http';
import { IPokemonAPIResource, IPokemon } from '../../interfaces/pokemons.interface';


const language = 'en';
export const SHOW_POKEMONS = 'SHOW_POKEMONS';
export const SHOW_POKEMONS_FULL = 'SHOW_POKEMONS_FULL';

export const showPokemons = (pokemonsShort: IPokemonAPIResource[]) => ({ type: SHOW_POKEMONS, payload: { pokemonsShort } });

export const getPokemonList = (offset = 0, limit = 20) => {
  return async (dispath: Dispatch) => {
    const { data: pokemons } = await httpService.get<{ count: number, results: IPokemonAPIResource[] }>(`/pokemon?offset=${offset}&limit=${limit}`);

    dispath({
      type: SHOW_POKEMONS,
      payload: { pokemonsShort: pokemons.results },
    });
  }
}

export const getPokemonsFull = (pokemonsShort: IPokemonAPIResource[]) => {
  return async (dispatch: Dispatch) => {
    const pokemonsFull = await Promise.all(pokemonsShort.map(p => getPokemon(p.name)));

    dispatch({
      type: SHOW_POKEMONS_FULL,
      payload: { pokemonsFull },
    });
  }
}

const getPokemon = async (pokemonName: string): Promise<IPokemon> => {
  const { data: pokemon } = await httpService.get<IPokemon>(`/pokemon/${pokemonName}`);
  await Promise.all([
    loadAbilities(pokemon),
    loadSpecies(pokemon)]
  );

  return pokemon;
}

const loadSpecies = async (pokemon: IPokemon) => {
  const { data: species } = await httpService.get<IPokemon['species']>(pokemon.species.url, { useBaseURL: false });
  const title = species.genera.find(g => g.language.name === language) || { genus: '' };
  Object.assign(pokemon.species, { title: title.genus, pokedex_numbers: species.pokedex_numbers || [] });
}

const loadAbilities = async (pokemon: IPokemon) => {
  await Promise.all(pokemon.abilities
    .sort(map(p => p.slot, asc))
    .map(async (ab) => {
      const { data: ability } = await httpService.get(ab.ability.url, { useBaseURL: false });
      const title = ability.names.find((n: any) => n.language.name === language) || { name: '' };
      Object.assign(ab, { title: title.name });
    })
  );
}
