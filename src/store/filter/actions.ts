import { Dispatch } from "redux";

import httpService from "../../utils/http";
import { showLoader, hideLoader, SET_POKEMON_COUNT } from "../pokemon-preview/actions";
import { IPokemonTypeAPIResource, ITypeAPI } from "../../interfaces/pokemons.interface";


export const SET_FILTER = 'SET_FILTER';
export const SET_TYPES_OPTION = 'SET_TYPES_OPTION';
export const SET_POKEMON_LIST_BY_FILTER = 'SET_POKEMON_LIST_BY_FILTER';

export const setFilter = (type: IPokemonTypeAPIResource | null = null) => {
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
    const pokemonArrayByType = await loadType(type);
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

export const loadTypes = () => {
  return async (dispatch: any) => {
    const { data } = await httpService.get<{ results: IPokemonTypeAPIResource[] }>('/type');

    dispatch({
      type: SET_TYPES_OPTION,
      payload: { typeList: data.results },
    })
  }
}

const loadType = async (type: IPokemonTypeAPIResource) => {
  const { data } = await httpService.get<ITypeAPI>(type.url, { useBaseURL: false });

  return data.pokemon;
}