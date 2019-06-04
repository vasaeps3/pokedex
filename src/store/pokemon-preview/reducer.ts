import { Reducer, Action } from "redux";

import { SHOW_LOADER, HIDE_LOADER, SET_POKEMON_COUNT, SHOW_POKEMONS_FULL, SHOW_POKEMONS, SHOW_EVOLUTION_CHAIN, HIDE_EVOLUTION_CHAIN } from "./actions.chain";
import { INamedAPIResource, IPokemon, IChainLink } from "../../interfaces/pokemon.interface";


export interface IPokemonAPIResourceState {
  pokemonsShort: INamedAPIResource[];
  pokemonsFull: IPokemon[];
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
  isLoading: false,
  count: 0,
  chain: null,
}

const pokemonPreviewReducer: Reducer<IPokemonAPIResourceState, IPokemonAPIResourceAction> = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      }
    case HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      }
    case SHOW_POKEMONS:
      return {
        ...state,
        pokemonsShort: payload.pokemonsShort,
        count: payload.count || state.count,
      }
    case SHOW_POKEMONS_FULL:
      return {
        ...state,
        pokemonsFull: payload.pokemonsFull,
      }
    case SET_POKEMON_COUNT:
      return {
        ...state,
        count: payload.count,
      }
    case SHOW_EVOLUTION_CHAIN:
      return {
        ...state,
        chain: payload.chain,
      }
    case HIDE_EVOLUTION_CHAIN:
      return {
        ...state,
        chain: null,
      }
    default:
      return state;
  }
}
export default pokemonPreviewReducer;

