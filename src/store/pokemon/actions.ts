import httpService from "../../utils/http";

export const LOAD_POKEMONS = 'LOAD_POKEMONS';


export const getPokemons = (offset?: number, limit?: number) => {
  return async (dispatch: any) => {
    const { data } = await httpService.get('/pokemon');
    // console.log(payload);
    dispatch({
      type: LOAD_POKEMONS,
      payload: data,
    });
  }

}