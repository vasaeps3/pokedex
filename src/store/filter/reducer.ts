import { Action, Reducer } from 'redux';

import { INamedAPIResource } from '../../interfaces/base.interface';
import { SET_POKEMON_LIST_BY_FILTER, SET_TYPES_OPTION } from './actions';

export interface IPokemonFilterState {
  isLoading: boolean;
  typeList: INamedAPIResource[];
  pokemonList: INamedAPIResource[];
  isUseFilter: boolean;
}

interface IPokemonFilterAction extends Action {
  payload: IPokemonFilterState;
}

const INITIAL_STATE = {
  isLoading: false,
  isUseFilter: false,
  typeList: [],
  pokemonList: [],
};

const filterReducer: Reducer<IPokemonFilterState, IPokemonFilterAction> = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case SET_TYPES_OPTION:
      return {
        ...state,
        typeList: payload.typeList,
      };
    case SET_POKEMON_LIST_BY_FILTER:
      return {
        ...state,
        pokemonList: payload.pokemonList,
        isUseFilter: payload.isUseFilter,
      };
    default:
      return state;
  }
};
export default filterReducer;
