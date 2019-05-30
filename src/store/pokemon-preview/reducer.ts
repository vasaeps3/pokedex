import { Reducer, Action } from "redux";


import { IPokemonAPIResource, IPokemon } from "../../interfaces/pokemons.interface";
import { SHOW_POKEMONS, SHOW_POKEMONS_FULL } from "./actions";


export interface IPokemonAPIResourceState {
  pokemonsShort: IPokemonAPIResource[];
  pokemonsFull: IPokemon[];
  isFilter: boolean;
}

interface IPokemonAPIResourceAction extends Action {
  payload: IPokemonAPIResourceState;
}

const INITIAL_STATE: IPokemonAPIResourceState = {
  pokemonsShort: [],
  pokemonsFull: [],
  isFilter: false,
}

const pokemonPreviewReducer: Reducer<IPokemonAPIResourceState, IPokemonAPIResourceAction> = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
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

