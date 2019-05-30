import { TypePokemon } from "./typePokemon.enum";


export interface IPokemon extends INamedAPIResource {
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
  language: INamedAPIResource;
}
export interface IPokedexNumber {
  entry_number: number;
  pokedex: INamedAPIResource;
}

export interface IAbilityPokemon {
  is_hidden: boolean;
  slot: number;
  title: string;
  ability: INamedAPIResource;
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

export interface INamedAPIResource {
  name: string;
  url: string;
}

export interface INamedLangAPIResource {
  language: INamedAPIResource;
  name: string;
}
export interface ITypeAPI {
  pokemon: {
    pokemon: IPokemonAPIResource[];
    slot: number;
  }[];
  names: INamedLangAPIResource[];
}