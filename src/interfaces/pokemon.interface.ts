import { IName, INamedAPIResource, INamedLangAPIResource } from './base.interface';
import { TypePokemon } from './type-pokemon.enum';


export interface IPokemon extends INamedAPIResource {
  id: number;
  types: ITypePokemon[];
  sprites: ISprites;
  species: ISpecies;
  abilities: IAbility[];
  height: number;
  weight: number;
  stats: IStat[];
  moves: IPokemonMove[];
}

export interface IPokemonMove {
  move: INamedAPIResource;
  version_group_details: IPokemonMoveVersion[];
}

export interface IPokemonMoveVersion {
  level_learned_at: number;
  move_learn_method: INamedAPIResource;
  version_group: INamedAPIResource;
}

export interface IMoveLearnMethod extends INamedLangAPIResource {
  descriptions: Array<{
    description: string;
    language: INamedAPIResource;
  }>;
}

export interface IMove extends INamedLangAPIResource {
  type: {
    url: string;
    name: TypePokemon;
    title: string;
  };
}

export interface IMovesLearntBy {
  leartMethod: INamedAPIResource;
  move: INamedAPIResource[];
}

export interface IChainLink {
  species: INamedAPIResource;
  evolves_to: IChainLink[];
  evolution_details: IEvolutionDetails[];
  pokemon: IPokemon;
}

export interface IEvolutionDetails {
  item: INamedAPIResource;
  trigger: INamedAPIResource;
  held_item: INamedAPIResource;
}

export interface IStat {
  base_stat: number;
  effort: number;
  stat: INamedAPIResource;
}

export interface IAbility {
  is_hidden: boolean;
  slot: number;
  ability: INamedAPIResource;
}

export interface IPokedexNumber {
  entry_number: number;
  pokedex: INamedAPIResource;
}

export interface ISpecies extends INamedAPIResource {
  names: IName[];
  pokedex_numbers: IPokedexNumber[];
  genera: IGenera[];
  generaTitle: string;
  evolution_chain: {
    url: string;
  };
}

export interface IGenera {
  genus: string;
  language: INamedAPIResource;
}

export interface ISprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_femaly: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_femaly: string;
}

export interface ITypePokemon {
  slot: number;
  type: {
    url: string;
    name: TypePokemon;
    title: string;
  };
}

export interface ITypeAPI {
  pokemon: Array<{
    pokemon: INamedAPIResource[];
    slot: number;
  }>;
  names: INamedLangAPIResource[];
}
