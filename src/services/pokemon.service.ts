
import apiService from "./api.service";
import { IPokemon, ISpecies, IChainLink, INamedAPIResource } from "../interfaces/pokemon.interface";


const getPokemonByName = async (pokemonName: IPokemon['name']): Promise<IPokemon> => {
  const { data: pokemon } = await apiService.get<IPokemon>(`/pokemon/${pokemonName}`);

  return { ...pokemon };
}

const getPokemonSpecies = async (pokemon: IPokemon): Promise<ISpecies> => {
  const { data: species } = await apiService.get<ISpecies>(pokemon.species.url, { useBaseURL: false });

  return { ...species };
}

const getChain = async (url: string): Promise<IChainLink> => {
  const { data } = await apiService.get<{ chain: IChainLink }>(url, { useBaseURL: false });

  return data.chain;
}


const getPokemonList = async (offset = 0, limit = 10) => {
  const { data } = await apiService.get<{ count: number, results: INamedAPIResource[] }>(`/pokemon?offset=${offset}&limit=${limit}`);

  return { results: data.results, count: data.count };
}

const getCountPokemonList = async (offset = 0, limit = 10) => {
  const { data } = await apiService.get<{ count: number, results: INamedAPIResource[] }>(`/pokemon?offset=${offset}&limit=${limit}`);

  return data.count;
}

const pokemonService = {
  getPokemonByName,
  getPokemonSpecies,
  getChain,
  getPokemonList,
  getCountPokemonList,
}

export default pokemonService;