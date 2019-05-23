import { Reducer, Action } from "redux";

import { LOAD_POKEMONS } from "./actions";
import { IPokemonState } from "../../interfaces/pokemons.interface";

interface IPokemonAction extends Action {
  payload: IPokemonState;
}

const INITIAL_STATE = {
  results: [],
  count: 0,
  offset: 0,
  limit: 20,
};

const socketReducer: Reducer<IPokemonState, IPokemonAction> = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  console.log(payload);
  switch (action.type) {
    case LOAD_POKEMONS:
      return {
        ...state,
        results: payload.results,
        count: payload.count,
      }
    default:
      return state;
  }
}
export default socketReducer;

