import httpService from "../../utils/http";
import { IPokemonTypeAPIResource, ITypeAPI } from "../../interfaces/pokemons.interface";


export const SET_FILTER = 'SET_FILTER';
export const SET_TYPES_OPTION = 'SET_TYPES_OPTION';

export const setFilter = (types: IPokemonTypeAPIResource[]) => {
  return async (dispatch: any) => {

    const pokemonArrayByType = await Promise.all(types.map(t => loadType(t)));
    const pokenomByFilter = pokemonArrayByType.reduce((acc, cur) => [...acc, ...cur], []).map(p => p.pokemon);
    console.log(pokenomByFilter);

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