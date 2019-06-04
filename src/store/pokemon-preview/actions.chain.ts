import { map, asc } from 'type-comparator';
import { Dispatch } from 'redux';

import pokemonService from "../../services/pokemon.service";
import { loadTranslateData } from '../../services/loading.service';
import { INamedAPIResource, ISpecies, IChainLink, IPokemon, IEvolutionDetails } from '../../interfaces/pokemon.interface';


const language = 'en';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SHOW_POKEMONS = 'SHOW_POKEMONS';
export const SET_POKEMON_COUNT = 'SET_POKEMON_COUNT';
export const SHOW_POKEMONS_FULL = 'SHOW_POKEMONS_FULL';
export const SHOW_EVOLUTION_CHAIN = 'SHOW_EVOLUTION_CHAIN';
export const HIDE_EVOLUTION_CHAIN = 'HIDE_EVOLUTION_CHAIN';

export const showLoader = () => ({ type: SHOW_LOADER });
export const hideLoader = () => ({ type: HIDE_LOADER });

export const showPokemons = (pokemonsShort: INamedAPIResource[]) => ({ type: SHOW_POKEMONS, payload: { pokemonsShort } });

export const loadPokemonList = (offset = 0, limit = 10) => {
  return async (dispath: Dispatch) => {
    dispath(showLoader());
    const pokemons = await pokemonService.getPokemonList(offset, limit);

    dispath(hideLoader());
    dispath({
      type: SHOW_POKEMONS,
      payload: {
        pokemonsShort: pokemons.results,
        count: pokemons.count,
      },
    });
  }
}

export const getPokemonsFull = (pokemonsShort: INamedAPIResource[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    const pokemonsFull = await Promise.all(pokemonsShort.map(p => loadPokemonByName(p.name)));
    dispatch(hideLoader());
    dispatch({
      type: SHOW_POKEMONS_FULL,
      payload: { pokemonsFull },
    });
  }
}

export const loadCountPokemonList = () => {
  return async (dispath: Dispatch) => {
    dispath(showLoader());

    const count = await pokemonService.getCountPokemonList();

    dispath(hideLoader());
    dispath({
      type: SET_POKEMON_COUNT,
      payload: {
        count,
      },
    });
  }
}

export const hideEvolutionChain = () => ({ type: HIDE_EVOLUTION_CHAIN });

export const showEvolutionChainNew = (evolution_chain: ISpecies['evolution_chain']) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    try {
      const chain = await pokemonService.getChain(evolution_chain.url);
      await Promise.all([
        loadChainTranslate(chain),
        loadChainPokemonInfo(chain),
      ]);
      dispatch({
        type: SHOW_EVOLUTION_CHAIN,
        payload: { chain },
      });
    } catch{ }

    dispatch(hideLoader());
  }
}

const loadChainPokemonInfo = async (chainLink: IChainLink) => {
  await Promise.all([
    ...chainLink.evolves_to.map(evolvesTo => loadChainPokemonInfo(evolvesTo)),
    loadChainPokemonByName(chainLink),
  ]);
}

const loadChainPokemonByName = async (chainLink: IChainLink) => {
  const pokemon = await loadPokemonByName(chainLink.species.name);

  chainLink.pokemon = pokemon;
}

const loadPokemonByName = async (pokemonName: string): Promise<IPokemon> => {
  const pokemon = await pokemonService.getPokemonByName(pokemonName);
  await loadFullPokemonInfo(pokemon);

  return pokemon;
}

const loadFullPokemonInfo = async (pokemon: IPokemon) => {
  await Promise.all([
    loadPokemonTypesTranslate(pokemon),
    loadPokemonSpecies(pokemon),
    loadPokemonAbilities(pokemon),
  ]);
}

const loadPokemonAbilities = async (pokemon: IPokemon) => {
  await Promise.all(pokemon.abilities
    .sort(map(p => p.slot, asc))
    .map(ab => loadTranslateData(ab.ability))
  );
}

const loadPokemonSpecies = async (pokemon: IPokemon) => {
  const species = await pokemonService.getPokemonSpecies(pokemon);
  const title = species.names.find(g => g.language.name === language) || { name: '' };
  const generaTitle = species.genera.find(g => g.language.name === language) || { genus: '' };
  Object.assign(pokemon.species, {
    title: title.name,
    generaTitle: generaTitle.genus,
    pokedex_numbers: species.pokedex_numbers || [],
    evolution_chain: species.evolution_chain,
  });
}

const loadPokemonTypesTranslate = async (pokemon: IPokemon) => {
  await Promise.all(pokemon.types.map(t => loadTranslateData(t.type)));
}

const loadChainTranslate = async (chainLink: IChainLink) => {
  await Promise.all([
    ...chainLink.evolves_to.map(evolvesTo => loadChainTranslate(evolvesTo)),
    ...chainLink.evolution_details.map(evolutionDetail => loadTranslateEvolutionDetails(evolutionDetail)),
  ]);
}

const loadTranslateEvolutionDetails = async (evolutionDetails: IEvolutionDetails) => {
  await Promise.all([
    loadTranslateData(evolutionDetails.trigger),
    loadTranslateData(evolutionDetails.item),
    loadTranslateData(evolutionDetails.held_item),
  ]);
}
