import { Reducer, Action } from "redux";

import { IPokemonAPIResource, IPokemon } from "../../interfaces/pokemons.interface";
import { SHOW_POKEMONS, SHOW_POKEMONS_FULL, SHOW_LOADER, HIDE_LOADER, SET_POKEMON_COUNT } from "./actions";


export interface IPokemonAPIResourceState {
  pokemonsShort: IPokemonAPIResource[];
  pokemonsFull: IPokemon[];
  isLoading: boolean;
  count: number;
}

interface IPokemonAPIResourceAction extends Action {
  payload: IPokemonAPIResourceState;
}

const INITIAL_STATE: IPokemonAPIResourceState = {
  pokemonsShort: [],
  pokemonsFull: [],
  isLoading: false,
  count: 0,
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
    default:
      return state;
  }
}
export default pokemonPreviewReducer;

