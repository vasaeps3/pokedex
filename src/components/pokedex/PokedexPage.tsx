import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { IState } from '../../store/reducers';
import { getPokemonList, showPokemons } from '../../store/pokemon-preview/actions';
import PokedexPageByFilter from './PokedexPageByFilter';
import { IPaginationState } from '../../store/pagination/reducer';
import { IPokemonFilterState } from '../../store/filter/reducer';
import { IPokemonAPIResource } from '../../interfaces/pokemons.interface';

export interface IAppProps {
  getPokemonResource: any;
  filter: IPokemonFilterState;
  pagination: IPaginationState;
  showPokemons: (pokemons: IPokemonAPIResource[]) => void;
}

class PokedexPage extends Component<IAppProps> {

  public render() {
    const { filter } = this.props;
    return (
      <Fragment>
        {filter.isUseFilter ?
          <PokedexPageByFilter
            pokemonList={filter.pokemonList}
            pagination={this.props.pagination}
            showPokemons={this.props.showPokemons} />
          : null}
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  filter: state.filter,
  pagination: state.pagination,
});

const mapDispatchToProps = { getPokemonResource: getPokemonList, showPokemons };

export default connect(mapStateToProps, mapDispatchToProps)(PokedexPage);
