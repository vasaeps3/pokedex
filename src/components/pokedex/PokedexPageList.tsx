import React, { Component } from 'react';
import { isEqual } from 'lodash';

import PokemonList from '../PokemonList';
import Paginations from '../common/pagination/Pagination';
import { IPaginationState } from '../../store/pagination/reducer';


export interface IAppProps {
  pokemonCount: number;
  pagination: IPaginationState;
  loadPokemonList: (offset?: number, limit?: number) => void;
  getCountPokemonList: () => void;
}

export default class PokedexPageList extends Component<IAppProps> {

  componentDidMount() {
    this.props.getCountPokemonList();
  }

  componentDidUpdate(prevProps: IAppProps) {
    if (!isEqual(this.props.pagination, prevProps.pagination)) {
      const { pagination } = this.props;
      this.props.loadPokemonList((pagination.currentPage - 1) * pagination.pageSize, pagination.pageSize);
    }
  }

  public render() {
    return (
      <div>
        <Paginations count={this.props.pokemonCount}></Paginations>
        <PokemonList />
        <Paginations count={this.props.pokemonCount}></Paginations>
      </div>
    );
  }
}
