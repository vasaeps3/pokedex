import { TypePokemon } from "./typePokemon.enum";

interface IBaseInfo {
  name: string;
  url: string;
}

export interface IPokemon extends IBaseInfo {
  id: number;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_femaly: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_femaly: string;
  };
  types: ITypePokemon[];
  stats: IStatsPokemon[];
  abilities: IAbilityPokemon[];
  species: {
    name: string;
    url: string;
    title: string;
    pokedex_numbers: IPokedexNumber[];
    genera: IPokemonGenera[];
  }
  height: number;
  weight: number;
}

export interface IPokemonGenera {
  genus: string;
  language: IBaseInfo;
}
export interface IPokedexNumber {
  entry_number: number;
  pokedex: IBaseInfo;
}

export interface IAbilityPokemon {
  is_hidden: boolean;
  slot: number;
  title: string;
  ability: IBaseInfo;
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
