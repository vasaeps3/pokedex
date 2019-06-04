import { TypePokemon } from "./typePokemon.enum";
import { INamedAPIResource, INamedLangAPIResource, ISprites, IPokedexNumber } from "../utils/loading.service";


export interface IPokemon extends INamedAPIResource {
  id: number;
  sprites: ISprites;
  types: ITypePokemon[];
  stats: IStatsPokemon[];
  // abilities: IAbilityPokemon[];
  species: {
    name: string;
    url: string;
    title: string;
    pokedex_numbers: IPokedexNumber[];
    genera: IPokemonGenera[];
    evolution_chain: {
      url: string;
    }
  }
  height: number;
  weight: number;
}

export interface IPokemonGenera {
  genus: string;
  language: INamedAPIResource;
}



export interface IStatsPokemon {
  base_stat: number;
  effort: number;
  stat: {
    url: string;
    name: TypeStatsPokemon;
  };
}

type TypeStatsPokemon = 'speed' | 'special-defense' | 'special-attack' | 'defense' | 'attack' | 'hp';

export interface ITypePokemon {
  slot: number;
  type: {
    url: string;
    name: TypePokemon;
  };
}

export interface IPokemonState {
  count: number;
  results: IPokemon[];
  offset: number;
  limit: number;
}

// -------------------------------------------------
export interface IPokemonTypeAPIResource extends INamedAPIResource { }
export interface IPokemonAPIResource extends INamedAPIResource { }



export interface ITypeAPI {
  pokemon: {
    pokemon: IPokemonAPIResource[];
    slot: number;
  }[];
  names: INamedLangAPIResource[];
}