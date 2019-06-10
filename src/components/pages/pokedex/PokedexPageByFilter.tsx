import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';

import { INamedAPIResource } from '../../../interfaces/base.interface';
import { IPaginationState } from '../../../store/pagination/reducer';
import Paginator from '../../common/paginator/Paginator';
import PokemonList from './PokemonList';


export interface IAppProps {
  pokemonList: INamedAPIResource[];
  pagination: IPaginationState;
  pokemonCount: number;
  showPokemons: (pokemons: INamedAPIResource[]) => void;
}

export default class PokedexPageByFilter extends Component<IAppProps> {

  public componentDidUpdate(prevProps: IAppProps) {
    if (!isEqual(this.props.pagination, prevProps.pagination)) {
      const { pagination } = this.props;
      this.props.showPokemons(this.props.pokemonList.slice(pagination.startIndex, pagination.endIndex + 1));
    }
  }

  public render() {
    return (
      <div>
        <Paginator count={this.props.pokemonCount} />
        <PokemonList />
        <Paginator count={this.props.pokemonCount} />
      </div>
    );
  }
}
