import { combineReducers } from "redux";

import pokemonsReducer from "./pokemon/reducer";

export default combineReducers({
  pokemons: pokemonsReducer
});