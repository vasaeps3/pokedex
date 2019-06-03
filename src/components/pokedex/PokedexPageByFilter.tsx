import React, { Component } from 'react';
import { isEqual } from 'lodash';

import Paginations from '../common/pagination/Pagination';
import { IPaginationState } from '../../store/pagination/reducer';
import { IPokemonAPIResource } from '../../interfaces/pokemons.interface';
import { IPokemonTypeAPIResource } from '../../interfaces/pokemons.interface';
import PokemonList from '../PokemonList';


export interface IAppProps {
  pokemonList: IPokemonTypeAPIResource[];
  pagination: IPaginationState;
  showPokemons: (pokemons: IPokemonAPIResource[]) => void;
}

export default class PokedexPageByFilter extends Component<IAppProps> {

  componentDidUpdate(prevProps: IAppProps) {
    if (!isEqual(this.props.pagination, prevProps.pagination)) {
      const { pagination } = this.props;
      this.props.showPokemons(this.props.pokemonList.slice(pagination.startIndex, pagination.endIndex + 1));
    }
  }

  public render() {
    const { pokemonList } = this.props;
    return (
      <div>
        <Paginations count={pokemonList.length}></Paginations>
        <PokemonList />
        <Paginations count={pokemonList.length}></Paginations>
      </div>
    );
  }
}
