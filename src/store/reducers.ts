import { combineReducers } from "redux";

import filterReducer from "./filter/reducer";
import pokemonsReducer from "./pokemon/reducer";
import pokemonPreviewReducer from "./pokemon-preview/reducer";


export default combineReducers({
  pokemons: pokemonsReducer,
  pokemonPreview: pokemonPreviewReducer,
  filter: filterReducer,
});