import { TypePokemon } from "./typePokemon.enum";

interface IBase {
  name: string;
  url: string;
}

export interface IPokemon extends IBase {
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
}

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
