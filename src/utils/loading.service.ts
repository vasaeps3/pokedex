import httpService from "./http";
import { TypePokemon } from "../interfaces/typePokemon.enum";


// import { INamedAPIResource } from "../interfaces/pokemons.interface";

const language = 'en';

export const loadTranslateData = async <T extends INamedLangAPIResource>(item: INamedAPIResource) => {
  if (!item) {
    return;
  }
  const { data } = await httpService.get<T>(item.url, { useBaseURL: false });
  const findTitle = data.names.find(g => g.language.name === language);
  item.title = findTitle ? findTitle.name : '';
}

export interface IName {
  name: string;
  language: INamedAPIResource;
}

export interface INamedAPIResource {
  name: string;
  title: string;
  url: string;
}

export interface INamedLangAPIResource {
  name: string;
  names: IName[];
}

export interface IChainLink {
  species: INamedAPIResource;
  evolves_to: IChainLink[];
  evolution_details: IEvolutionDetails[];
  pokemon: IPokemonNew;
}

export interface IEvolutionDetails {
  item: INamedAPIResource;
  trigger: INamedAPIResource;
  held_item: INamedAPIResource;
}

export interface IPokemonNew extends INamedAPIResource {
  id: number;
  types: ITypePokemonNew[];
  sprites: ISprites;
  species: ISpecies;
  abilities: IAbility[];
  height: number;
  weight: number;
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

export interface ITypePokemonNew {
  slot: number;
  type: {
    url: string;
    name: TypePokemon;
    title: string;
  };
}

export interface IEvolutionTrigger extends INamedLangAPIResource { }
