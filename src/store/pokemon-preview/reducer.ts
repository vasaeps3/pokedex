import { Action, Reducer } from 'redux';

import { INamedAPIResource } from '../../interfaces/base.interface';
import { IChainLink, IPokemon } from '../../interfaces/pokemon.interface';
import {
  HIDE_EVOLUTION_CHAIN,
  HIDE_LOADER,
  POKEMON_DETAILS,
  SET_POKEMON_COUNT,
  SHOW_EVOLUTION_CHAIN,
  SHOW_LOADER,
  SHOW_POKEMONS,
  SHOW_POKEMONS_FULL,
} from './actions';


export interface IPokemonAPIResourceState {
  pokemonsShort: INamedAPIResource[];
  pokemonsFull: IPokemon[];
  pokemonDetails: IPokemon | null;
  isLoading: boolean;
  count: number;
  chain: IChainLink | null;
}

interface IPokemonAPIResourceAction extends Action {
  payload: IPokemonAPIResourceState;
}

const INITIAL_STATE: IPokemonAPIResourceState = {
  pokemonsShort: [],
  pokemonsFull: [],
  pokemonDetails: null,
  isLoading: false,
  count: 0,
  chain: null,
};

const pokemonPreviewReducer: Reducer<IPokemonAPIResourceState, IPokemonAPIResourceAction>
  = (state = INITIAL_STATE, action) => {
    const { payload } = action;
    switch (action.type) {
      case POKEMON_DETAILS:
        return {
          ...state,
          pokemonDetails: payload.pokemonDetails,
        };
      case SHOW_LOADER:
        return {
          ...state,
          isLoading: true,
        };
      case HIDE_LOADER:
        return {
          ...state,
          isLoading: false,
        };
      case SHOW_POKEMONS:
        return {
          ...state,
          pokemonsShort: payload.pokemonsShort,
          count: payload.count || state.count,
        };
      case SHOW_POKEMONS_FULL:
        return {
          ...state,
          pokemonsFull: payload.pokemonsFull,
        };
      case SET_POKEMON_COUNT:
        return {
          ...state,
          count: payload.count,
        };
      case SHOW_EVOLUTION_CHAIN:
        return {
          ...state,
          chain: payload.chain,
        };
      case HIDE_EVOLUTION_CHAIN:
        return {
          ...state,
          chain: null,
        };
      default:
        return state;
    }
  };
export default pokemonPreviewReducer;
