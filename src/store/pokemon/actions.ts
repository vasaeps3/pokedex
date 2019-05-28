import { map, asc } from 'type-comparator';

import httpService from "../../utils/http";
import { IPokemon } from "../../interfaces/pokemons.interface";
export const LOAD_POKEMONS = 'LOAD_POKEMONS';

const language = 'en';

export const getPokemons = (offset = 0, limit = 10) => {
  return async (dispatch: any) => {
    const { data } = await httpService.get(`/pokemon?offset=${offset}&limit=${limit}`);

    const pokemonsShorts: IPokemon[] = data.results;
    const pokemons = await Promise.all(pokemonsShorts.map(p => getPokemon(p.name)));

    dispatch({
      type: LOAD_POKEMONS,
      payload: {
        ...data,
        results: pokemons,
        offset,
        limit,
      },
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
  const { data: species } = await httpService.get(pokemon.species.url, { useBaseURL: false });
  // TODO: Fix types
  const title = species.genera.find((g: any) => g.language.name === language) || { genus: '' };
  Object.assign(pokemon.species, { title: title.genus });
}

const loadAbilities = async (pokemon: IPokemon) => {
  await Promise.all(pokemon.abilities
    .sort(map(p => p.slot, asc))
    .map(async (ab) => {
      const { data: ability } = await httpService.get(ab.ability.url, { useBaseURL: false });
      // TODO: Fix types
      const title = ability.names.find((n: any) => n.language.name === language) || { name: '' };
      Object.assign(ab, { title: title.name });
    })
  );
}
