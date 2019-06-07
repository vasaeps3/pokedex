import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';

import { IPaginationState } from '../../../store/pagination/reducer';
import Paginator from '../../common/paginator/Paginator';
import PokemonList from './PokemonList';

export interface IAppProps {
  pokemonCount: number;
  pagination: IPaginationState;
  loadPokemonList: (offset?: number, limit?: number) => void;
  getCountPokemonList: () => void;
}

export default class PokedexPageList extends Component<IAppProps> {

  public componentDidMount() {
    this.props.getCountPokemonList();
  }

  public componentDidUpdate(prevProps: IAppProps) {
    if (!isEqual(this.props.pagination, prevProps.pagination)) {
      const { pagination } = this.props;
      this.props.loadPokemonList((pagination.currentPage - 1) * pagination.pageSize, pagination.pageSize);
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
