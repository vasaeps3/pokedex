import { Reducer, Action } from "redux";


import { IPokemonAPIResource } from "../../interfaces/pokemons.interface";
import { SHOW_POKEMONS } from "./actions";


interface IPokemonAPIResourceState {
  pokemons: IPokemonAPIResource[];
  isFilter: boolean;
}

interface IPokemonAPIResourceAction extends Action {
  payload: IPokemonAPIResource[];
}

const INITIAL_STATE: IPokemonAPIResourceState = {
  pokemons: [],
  isFilter: false,
}

const pokemonResourceReducer: Reducer<IPokemonAPIResourceState, IPokemonAPIResourceAction> = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case SHOW_POKEMONS:
      return {
        ...state,
        pokemons: payload,
      }
    default:
      return state;
  }
}
export default pokemonResourceReducer;

