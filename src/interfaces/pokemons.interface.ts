export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonState {
  count: number;
  results: IPokemon[];
  offset: number;
  limit: number;
}
