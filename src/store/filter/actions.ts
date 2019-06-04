import { Dispatch } from "redux";

import typeService from "../../services/type.service";
import { loadTranslateData } from "../../services/loading.service";
import { showLoader, hideLoader, SET_POKEMON_COUNT } from "../pokemon-preview/actions.chain";
import { INamedAPIResource } from "../../interfaces/pokemon.interface";


export const SET_FILTER = 'SET_FILTER';
export const SET_TYPES_OPTION = 'SET_TYPES_OPTION';
export const SET_POKEMON_LIST_BY_FILTER = 'SET_POKEMON_LIST_BY_FILTER';

export const loadTypes = () => {
  return async (dispatch: any) => {
    const typeList = await typeService.getTypes()
    await Promise.all(typeList.map(t => loadTranslateData(t)));

    dispatch({
      type: SET_TYPES_OPTION,
      payload: { typeList },
    })
  }
}

export const setFilter = (type: INamedAPIResource | null = null) => {
  return async (dispatch: Dispatch) => {

    if (!type) {
      dispatch({
        type: SET_POKEMON_LIST_BY_FILTER,
        payload: {
          pokemonList: [],
          isUseFilter: false,
        },
      });
      return;
    }

    dispatch(showLoader());
    const pokemonArrayByType = await typeService.getPokemonsByType(type);
    const pokemonList = pokemonArrayByType.map(p => p.pokemon);

    dispatch(hideLoader());
    dispatch({
      type: SET_POKEMON_LIST_BY_FILTER,
      payload: {
        pokemonList: pokemonList,
        isUseFilter: true,
      },
    });

    dispatch({
      type: SET_POKEMON_COUNT,
      payload: {
        count: pokemonList.length,
      },
    });
  }
}
