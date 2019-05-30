import { Reducer, Action } from "redux";

import { IPokemonTypeAPIResource } from "../../interfaces/pokemons.interface";
import { SET_TYPES_OPTION } from "./actions";


export interface IPokemonFilterState {
  isLoading: boolean;
  typeList: IPokemonTypeAPIResource[];
  typeShoose: IPokemonTypeAPIResource[];
}

interface IPokemonFilterAction extends Action {
  payload: IPokemonFilterState;
}

const INITIAL_STATE = {
  isLoading: false,
  typeList: [],
  typeShoose: [],
}

const filterReducer: Reducer<IPokemonFilterState, IPokemonFilterAction> = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case SET_TYPES_OPTION: {
      console.log(payload);
      return {
        ...state,
        typeList: payload.typeList,
      }
    }
    default:
      return state;
  }
}
export default filterReducer;

