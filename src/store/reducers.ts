import { combineReducers } from "redux";

import filterReducer, { IPokemonFilterState } from "./filter/reducer";
import pokemonsReducer from "./pokemon/reducer";
import paginationReducer, { IPaginationState } from "./pagination/reducer";
import pokemonPreviewReducer from "./pokemon-preview/reducer";


export default combineReducers({
  pokemons: pokemonsReducer,
  pokemonPreview: pokemonPreviewReducer,
  filter: filterReducer,
  pagination: paginationReducer,
});

export interface IState {
  pagination: IPaginationState;
  filter: IPokemonFilterState;
}