import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { INamedAPIResource } from '../../../interfaces/base.interface';
import { ISpecies } from '../../../interfaces/pokemon.interface';
import { IPokemonFilterState } from '../../../store/filter/reducer';
import { IPaginationState } from '../../../store/pagination/reducer';
import {
  loadCountPokemonList,
  loadPokemonList,
  showEvolutionChainNew,
  showPokemons,
} from '../../../store/pokemon-preview/actions';
import { IState } from '../../../store/reducers';
import PokedexPageByFilter from './PokedexPageByFilter';
import PokedexPageList from './PokedexPageList';


export interface IAppProps {
  filter: IPokemonFilterState;
  pagination: IPaginationState;
  pokemonCount: number;
  loadPokemonList: (offset?: number, limit?: number) => void;
  showPokemons: (pokemons: INamedAPIResource[]) => void;
  loadCountPokemonList: () => void;
  showEvolutionChainNew: (evolutionChain: ISpecies['evolution_chain']) => void;
}

class PokedexPage extends Component<IAppProps> {

  public render() {
    const { filter } = this.props;

    const pokedexPageByFilter = (
      <PokedexPageByFilter
        pokemonList={filter.pokemonList}
        pagination={this.props.pagination}
        showPokemons={this.props.showPokemons}
        pokemonCount={this.props.pokemonCount}
      />
    );

    const pokedexPageList = (
      <PokedexPageList
        getCountPokemonList={this.props.loadCountPokemonList}
        loadPokemonList={this.props.loadPokemonList}
        pokemonCount={this.props.pokemonCount}
        pagination={this.props.pagination}
      />
    );

    return (
      <Fragment>
        {filter.isUseFilter ? pokedexPageByFilter : pokedexPageList}
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
  loadPokemonList,
  showPokemons,
  loadCountPokemonList,
  showEvolutionChainNew,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokedexPage);
