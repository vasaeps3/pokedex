import { asc, map } from 'type-comparator';

import config from '../env';
import { IChainLink, IEvolutionDetails, INamedAPIResource, IPokemon, ISpecies, IMoveLearnMethod } from '../interfaces/pokemon.interface';
import { ApiService, apiService as apiServiceInstance } from './api.service';
import {
  LoadTranslationsService,
  loadTranslationsService as loadTranslationsServiceInstance,
} from './load-translations.service';
import { IGeneration } from '../interfaces/generation.interface';
import { NamedAPIResourceList } from '../interfaces/base.interface';


export class PokemonService {
  private language = config.language;

  constructor(
    private apiService: ApiService,
    private loadTranslationsService: LoadTranslationsService,
  ) { }

  public async getGenerationList(): Promise<IGeneration[]> {
    const { data: generationRecource } = await this.apiService.get<NamedAPIResourceList<IGeneration>>(`/generation`);
    const generationList = await Promise.all(generationRecource.results.map((g) => this.getGenerationByName(g.name)));
    // await Promise.all(generationList.map(g => this.loadVersionGroupsTranslate(g)));

    return generationList;
  }

  public async getMoveLearnMethod(url: string): Promise<IMoveLearnMethod> {
    const { data: moveLearnMethod } = await this.apiService.get<IMoveLearnMethod>(url, { useBaseURL: false });

    return moveLearnMethod;
  }

  // private loadVersionGroupsTranslate = (generation: IGeneration) => {
  //   return Promise.all(generation.version_groups.map(v => this.loadTranslationsService.loadTranslateData(v)));
  // }

  public async getGenerationByName(genarationName: string): Promise<IGeneration> {
    const { data: generation } = await this.apiService.get<IGeneration>(`/generation/${genarationName}`);

    return generation;
  }

  public async getPokemonByName(pokemonName: IPokemon['name']): Promise<IPokemon> {
    const { data: pokemon } = await this.apiService.get<IPokemon>(`/pokemon/${pokemonName}`);

    return { ...pokemon };
  }

  public async getPokemonList(offset = 0, limit = 10): Promise<{ results: INamedAPIResource[]; count: number; }> {
    // tslint:disable-next-line: max-line-length
    const { data } = await this.apiService.get<{ count: number, results: INamedAPIResource[] }>(`/pokemon?offset=${offset}&limit=${limit}`);

    return { results: data.results, count: data.count };
  }

  public async getCountPokemonList(offset = 0, limit = 10): Promise<number> {
    // tslint:disable-next-line: max-line-length
    const { data } = await this.apiService.get<{ count: number, results: INamedAPIResource[] }>(`/pokemon?offset=${offset}&limit=${limit}`);

    return data.count;
  }

  public async getChain(url: string): Promise<IChainLink> {
    const { data } = await this.apiService.get<{ chain: IChainLink }>(url, { useBaseURL: false });

    return data.chain;
  }

  public async loadChainPokemonByName(chainLink: IChainLink) {
    const pokemon = await this.loadPokemonByName(chainLink.species.name);

    chainLink.pokemon = pokemon;
  }

  public async loadPokemonByName(pokemonName: string): Promise<IPokemon> {
    const pokemon = await this.getPokemonByName(pokemonName);
    await this.loadFullPokemonInfo(pokemon);

    return pokemon;
  }

  public async loadChainPokemonInfo(chainLink: IChainLink) {
    await Promise.all([
      ...chainLink.evolves_to.map((evolvesTo) => this.loadChainPokemonInfo(evolvesTo)),
      this.loadChainPokemonByName(chainLink),
    ]);
  }

  public async loadChainTranslate(chainLink: IChainLink) {
    await Promise.all([
      ...chainLink.evolves_to.map((evolvesTo) => this.loadChainTranslate(evolvesTo)),
      ...chainLink.evolution_details.map((evolutionDetail) => this.loadTranslateEvolutionDetails(evolutionDetail)),
    ]);
  }

  private loadTranslateEvolutionDetails = async (evolutionDetails: IEvolutionDetails) => {
    await Promise.all([
      this.loadTranslationsService.loadTranslateData(evolutionDetails.trigger),
      this.loadTranslationsService.loadTranslateData(evolutionDetails.item),
      this.loadTranslationsService.loadTranslateData(evolutionDetails.held_item),
    ]);
  }


  private loadFullPokemonInfo(pokemon: IPokemon) {
    return Promise.all([
      this.loadPokemonTypesTranslate(pokemon),
      this.loadPokemonSpecies(pokemon),
      this.loadPokemonAbilities(pokemon),
    ]);
  }

  private loadPokemonTypesTranslate(pokemon: IPokemon) {
    return Promise.all(pokemon.types.map((t) => this.loadTranslationsService.loadTranslateData(t.type)));
  }

  private async loadPokemonSpecies(pokemon: IPokemon) {
    const species = await this.getPokemonSpecies(pokemon);
    const title = species.names.find((g) => g.language.name === this.language) || { name: '' };
    const generaTitle = species.genera.find((g) => g.language.name === this.language) || { genus: '' };

    Object.assign(pokemon.species, {
      title: title.name,
      generaTitle: generaTitle.genus,
      pokedex_numbers: species.pokedex_numbers || [],
      evolution_chain: species.evolution_chain,
    });
  }

  private loadPokemonAbilities(pokemon: IPokemon) {
    return Promise.all(pokemon.abilities
      .sort(map((p) => p.slot, asc))
      .map((ab) => this.loadTranslationsService.loadTranslateData(ab.ability)),
    );
  }

  private async getPokemonSpecies(pokemon: IPokemon): Promise<ISpecies> {
    const { data: species } = await this.apiService.get<ISpecies>(pokemon.species.url, { useBaseURL: false });

    return { ...species };
  }

}

export const pokemonService = new PokemonService(apiServiceInstance, loadTranslationsServiceInstance);
