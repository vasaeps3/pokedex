import apiService from "./api.service";
import { INamedAPIResource, ITypeAPI } from "../interfaces/pokemon.interface";


const getTypes = async () => {
  const { data } = await apiService.get<{ results: INamedAPIResource[] }>('/type');

  return data.results;
}

const getPokemonsByType = async (type: INamedAPIResource) => {
  const { data } = await apiService.get<ITypeAPI>(type.url, { useBaseURL: false });

  return data.pokemon;
}

const typeService = {
  getTypes,
  getPokemonsByType,
}

export default typeService;