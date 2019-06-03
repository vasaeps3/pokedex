import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loader from '../loader/Loader';
import { IState } from '../../store/reducers';
import { getPokemonList, showPokemons, getCountPokemonList } from '../../store/pokemon-preview/actions';
import PokedexPageByFilter from './PokedexPageByFilter';
import { IPaginationState } from '../../store/pagination/reducer';
import { IPokemonFilterState } from '../../store/filter/reducer';
import { IPokemonAPIResource } from '../../interfaces/pokemons.interface';
import PokedexPageList from './PokedexPageList';

export interface IAppProps {
  filter: IPokemonFilterState;
  pagination: IPaginationState;
  pokemonCount: number;
  getPokemonList: (offset?: number, limit?: number) => void;
  showPokemons: (pokemons: IPokemonAPIResource[]) => void;
  getCountPokemonList: () => void;
}

class PokedexPage extends Component<IAppProps> {

  public render() {
    const { filter } = this.props;
    return (
      <Fragment>
        <Loader />
        {filter.isUseFilter ?
          <PokedexPageByFilter
            pokemonList={filter.pokemonList}
            pagination={this.props.pagination}
            showPokemons={this.props.showPokemons}
            pokemonCount={this.props.pokemonCount} /> :
          <PokedexPageList
            getCountPokemonList={this.props.getCountPokemonList}
            getPokemonList={this.props.getPokemonList}
            pokemonCount={this.props.pokemonCount}
            pagination={this.props.pagination} />}
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  filter: state.filter,
  pagination: state.pagination,
  pokemonCount: state.pokemonPreview.count,
});

const mapDispatchToProps = {
  getPokemonList,
  showPokemons,
  getCountPokemonList,
};
export default connect(mapStateToProps, mapDispatchToProps)(PokedexPage);
