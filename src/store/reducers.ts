import { combineReducers } from 'redux';

import filterReducer, { IPokemonFilterState } from './filter/reducer';
import paginationReducer, { IPaginationState } from './pagination/reducer';
import pokemonPreviewReducer, { IPokemonAPIResourceState } from './pokemon-preview/reducer';


export default combineReducers({
  pokemonPreview: pokemonPreviewReducer,
  filter: filterReducer,
  pagination: paginationReducer,
});

export interface IState {
  filter: IPokemonFilterState;
  pagination: IPaginationState;
  pokemonPreview: IPokemonAPIResourceState;
}
