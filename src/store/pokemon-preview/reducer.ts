import { Reducer, Action } from "redux";


import { IPokemonAPIResource, IPokemon } from "../../interfaces/pokemons.interface";
import { SHOW_POKEMONS, SHOW_POKEMONS_FULL, SHOW_LOADER, HIDE_LOADER } from "./actions";


export interface IPokemonAPIResourceState {
  pokemonsShort: IPokemonAPIResource[];
  pokemonsFull: IPokemon[];
  isLoading: boolean;
}

interface IPokemonAPIResourceAction extends Action {
  payload: IPokemonAPIResourceState;
}

const INITIAL_STATE: IPokemonAPIResourceState = {
  pokemonsShort: [],
  pokemonsFull: [],
  isLoading: false,
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
      }
    case SHOW_POKEMONS_FULL:
      return {
        ...state,
        pokemonsFull: payload.pokemonsFull,
      }
    default:
      return state;
  }
}
export default pokemonPreviewReducer;

