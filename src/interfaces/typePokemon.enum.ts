export enum TypePokemon {
  NORMAL = 'normal',
  FIGHTING = 'fighting',
  FLYING = 'flying',
  POISON = 'poison',
  GROUND = 'ground',
  ROCK = 'rock',
  BUG = 'bug',
  GHOST = 'ghost',
  STEEL = 'steel',
  FIRE = 'fire',
  WATER = 'water',
  GRASS = 'grass',
  ELECTRIC = 'electric',
  PSYCHIC = 'psychic',
  ICE = 'ice',
  DRAGON = 'dragon',
  DARK = 'dark',
  FAIRY = 'fairy',
  UNKNOWN = 'unknown',
  SHADOW = 'shadow',
}

type IColorTypePokemon = {
  [k in TypePokemon]?: string;
}

export const ColorTypePokemon: IColorTypePokemon = {
  [TypePokemon.FIGHTING]: '#aa9',
  [TypePokemon.FIGHTING]: '#b54',
  [TypePokemon.FLYING]: '#89f',
  [TypePokemon.POISON]: '#a59',
  [TypePokemon.GROUND]: '#db5',
  [TypePokemon.ROCK]: '#ba6',
  [TypePokemon.BUG]: '#ab2',
  [TypePokemon.GHOST]: '#66b',
  [TypePokemon.STEEL]: '#aab',
  [TypePokemon.FIRE]: '#f42',
  [TypePokemon.WATER]: '#39f',
  [TypePokemon.GRASS]: '#7c5',
  [TypePokemon.ELECTRIC]: '#fc3',
  [TypePokemon.PSYCHIC]: '#f59',
  [TypePokemon.ICE]: '#6cf',
  [TypePokemon.DRAGON]: '#76e',
  [TypePokemon.DARK]: '#754',
  [TypePokemon.FAIRY]: '#e9e',
  [TypePokemon.UNKNOWN]: '#fff',
  [TypePokemon.SHADOW]: '#a3a',
}