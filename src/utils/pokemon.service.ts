import httpService from "./http";

import { IPokemon } from "../interfaces/pokemons.interface";


export const getPokemonByName = async (name: string): Promise<IPokemon> => {
  const { data } = await httpService.get<IPokemon>(`/pokemon/${name}`);

  return data;
}