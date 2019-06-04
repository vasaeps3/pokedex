import { map, asc } from 'type-comparator';
import { Dispatch } from 'redux';

import { IChainLink, IEvolutionDetails, loadTranslateData, IPokemonNew, ISpecies, INamedAPIResource } from "../../utils/loading.service";
import { getChain, getPokemonSpecies, getPokemonByName, getCountPokemonList } from "../../utils/pokemon.service";


const language = 'en';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const SET_POKEMON_COUNT = 'SET_POKEMON_COUNT';
export const SHOW_POKEMONS_FULL = 'SHOW_POKEMONS_FULL';
export const SHOW_EVOLUTION_CHAIN = 'SHOW_EVOLUTION_CHAIN';

export const showLoader = () => ({ type: SHOW_LOADER });
export const hideLoader = () => ({ type: HIDE_LOADER });


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

    const count = await getCountPokemonList();

    dispath(hideLoader());
    dispath({
      type: SET_POKEMON_COUNT,
      payload: {
        count,
      },
    });
  }
}

export const showEvolutionChainNew = (evolution_chain: ISpecies['evolution_chain']) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoader());
    try {
      const chain = await getChain(evolution_chain.url);
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

const loadPokemonByName = async (pokemonName: string): Promise<IPokemonNew> => {
  const pokemon = await getPokemonByName(pokemonName);
  await loadFullPokemonInfo(pokemon);

  return pokemon;
}

const loadFullPokemonInfo = async (pokemon: IPokemonNew) => {
  await Promise.all([
    loadPokemonTypesTranslate(pokemon),
    loadPokemonSpecies(pokemon),
    loadPokemonAbilities(pokemon),
  ]);
}

const loadPokemonAbilities = async (pokemon: IPokemonNew) => {
  await Promise.all(pokemon.abilities
    .sort(map(p => p.slot, asc))
    .map(ab => loadTranslateData(ab.ability))
  );
}

const loadPokemonSpecies = async (pokemon: IPokemonNew) => {
  const species = await getPokemonSpecies(pokemon);

  const title = species.names.find(g => g.language.name === language) || { name: '' };
  const generaTitle = species.genera.find(g => g.language.name === language) || { genus: '' };
  Object.assign(pokemon.species, {
    title: title.name,
    generaTitle: generaTitle.genus,
    pokedex_numbers: species.pokedex_numbers || [],
    evolution_chain: species.evolution_chain,
  });
}

const loadPokemonTypesTranslate = async (pokemon: IPokemonNew) => {
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
