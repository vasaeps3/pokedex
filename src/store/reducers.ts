import { combineReducers } from "redux";

import pokemonsReducer from "./pokemon/reducer";
import pokemonResourceReducer from "./pokemon-resource/reducer";


export default combineReducers({
  pokemons: pokemonsReducer,
  pokemonResource: pokemonResourceReducer,
});