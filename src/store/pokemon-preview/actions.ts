import { toast } from 'react-toastify';
import { Dispatch } from 'redux';

import { INamedAPIResource } from '../../interfaces/base.interface';
import { IPokemon, ISpecies } from '../../interfaces/pokemon.interface';
import { pokemonService } from '../../services/pokemon.service';


export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SHOW_POKEMONS = 'SHOW_POKEMONS';
export const SET_POKEMON_COUNT = 'SET_POKEMON_COUNT';
export const SHOW_POKEMONS_FULL = 'SHOW_POKEMONS_FULL';
export const SHOW_EVOLUTION_CHAIN = 'SHOW_EVOLUTION_CHAIN';
export const HIDE_EVOLUTION_CHAIN = 'HIDE_EVOLUTION_CHAIN';
export const POKEMON_DETAILS = 'POKEMON_DETAILS';

export const showLoader = () => ({ type: SHOW_LOADER });
export const hideLoader = () => ({ type: HIDE_LOADER });

export const showPokemons = (pokemonsShort: INamedAPIResource[]) => ({
  type: SHOW_POKEMONS,
  payload: { pokemonsShort },
});

export const loadPokemonDetails = (pokemonName: IPokemon['name']) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    try {
      const pokemon = await pokemonService.loadPokemonByName(pokemonName);
      dispatch({
        type: POKEMON_DETAILS,
        payload: {
          pokemonDetails: pokemon,
        },
      });
    } catch {
      toast.error('Error loading resources');
    }
    dispatch(hideLoader());
  };
};

export const loadPokemonList = (offset = 0, limit = 10) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const pokemons = await pokemonService.getPokemonList(offset, limit);

    dispatch(hideLoader());
    dispatch({
      type: SHOW_POKEMONS,
      payload: {
        pokemonsShort: pokemons.results,
        count: pokemons.count,
      },
    });
  };
};

export const getPokemonsFull = (pokemonsShort: INamedAPIResource[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const pokemonsFull = await Promise.all(pokemonsShort.map((p) => pokemonService.loadPokemonByName(p.name)));
    dispatch(hideLoader());
    dispatch({
      type: SHOW_POKEMONS_FULL,
      payload: { pokemonsFull },
    });
  };
};

export const loadCountPokemonList = () => {
  return async (dispath: Dispatch) => {
    dispath(showLoader());

    const count = await pokemonService.getCountPokemonList();

    dispath(hideLoader());
    dispath({
      type: SET_POKEMON_COUNT,
      payload: {
        count,
      },
    });
  };
};

export const hideEvolutionChain = () => ({ type: HIDE_EVOLUTION_CHAIN });

export const showEvolutionChainNew = (evolutionChain: ISpecies['evolution_chain']) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    try {
      const chain = await pokemonService.getChain(evolutionChain.url);
      await Promise.all([
        pokemonService.loadChainTranslate(chain),
        pokemonService.loadChainPokemonInfo(chain),
      ]);
      dispatch({
        type: SHOW_EVOLUTION_CHAIN,
        payload: { chain },
      });
    } catch {
      toast.error('Error loading resources');
    }

    dispatch(hideLoader());
  };
};
