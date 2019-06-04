
import { Dispatch } from 'redux';


import httpService from '../../utils/http';
import { IPokemonAPIResource, IPokemon, } from '../../interfaces/pokemons.interface';


const language = 'en';

export const SHOW_POKEMONS = 'SHOW_POKEMONS';


export const SHOW_EVOLUTION_CHAIN = 'SHOW_EVOLUTION_CHAIN';
export const HIDE_EVOLUTION_CHAIN = 'HIDE_EVOLUTION_CHAIN';



export const showPokemons = (pokemonsShort: IPokemonAPIResource[]) => ({ type: SHOW_POKEMONS, payload: { pokemonsShort } });
export const hideEvolutionChain = () => ({ type: HIDE_EVOLUTION_CHAIN });


export const getPokemonList = (offset = 0, limit = 10) => {
  return async (dispath: Dispatch) => {
    const { data: pokemons } = await httpService.get<{ count: number, results: IPokemonAPIResource[] }>(`/pokemon?offset=${offset}&limit=${limit}`);
    dispath({
      type: SHOW_POKEMONS,
      payload: {
        pokemonsShort: pokemons.results,
        count: pokemons.count,
      },
    });
  }
}


// const getPokemon = async (pokemonName: string): Promise<IPokemon> => {
//   const { data: pokemon } = await httpService.get<IPokemon>(`/pokemon/${pokemonName}`);
//   await Promise.all([
//     loadAbilities(pokemon),
//     loadSpecies(pokemon)
//   ]);

//   return pokemon;
// }

// const loadSpecies = async (pokemon: IPokemon) => {
//   const { data: species } = await httpService.get<IPokemon['species']>(pokemon.species.url, { useBaseURL: false });
//   // const title = species.genera.find(g => g.language.name === language) || { genus: '' };

//   Object.assign(pokemon.species, {
//     // title: '2222222222',
//     // pokedex_numbers: species.pokedex_numbers || [],
//     evolution_chain: species.evolution_chain,
//   });
// }

