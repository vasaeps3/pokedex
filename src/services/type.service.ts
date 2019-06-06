import { INamedAPIResource, ITypeAPI } from '../interfaces/pokemon.interface';
import { ApiService, apiService as apiServiceInstance } from './api.service';


export class TypeService {

  constructor(
    private apiService: ApiService,
  ) { }

  public async getTypes(): Promise<INamedAPIResource[]> {
    const { data } = await this.apiService.get<{ results: INamedAPIResource[] }>('/type');

    return data.results;
  }

  public async getPokemonsByType(type: INamedAPIResource) {
    const { data } = await this.apiService.get<ITypeAPI>(type.url, { useBaseURL: false });

    return data.pokemon;
  }

}

export const typeService = new TypeService(apiServiceInstance);
