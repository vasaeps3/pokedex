import httpService from "./http";

import { IChainLink, IPokemonNew, ISpecies, INamedAPIResource } from "./loading.service";


export const getPokemonByName = async (pokemonName: IPokemonNew['name']) => {
  const { data: pokemon } = await httpService.get<IPokemonNew>(`/pokemon/${pokemonName}`);

  return { ...pokemon };
}

export const getPokemonSpecies = async (pokemon: IPokemonNew): Promise<ISpecies> => {
  const { data: species } = await httpService.get<ISpecies>(pokemon.species.url, { useBaseURL: false });

  return { ...species };
}

export const getChain = async (url: string): Promise<IChainLink> => {
  const { data } = await httpService.get<{ chain: IChainLink }>(url, { useBaseURL: false });

  return data.chain;
}

export const getCountPokemonList = async (offset = 0, limit = 10) => {
  const { data } = await httpService.get<{ count: number, results: INamedAPIResource[] }>(`/pokemon?offset=${offset}&limit=${limit}`);

  return data.count;
}