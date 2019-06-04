import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Loader from '../loader/Loader';
import { IState } from '../../store/reducers';
import { getPokemonList, showPokemons } from '../../store/pokemon-preview/actions';
import PokedexPageByFilter from './PokedexPageByFilter';
import { IPaginationState } from '../../store/pagination/reducer';
import { IPokemonFilterState } from '../../store/filter/reducer';
import { IPokemonAPIResource } from '../../interfaces/pokemons.interface';
import PokedexPageList from './PokedexPageList';
import PokemonEvolutionChainModal from '../pokemon-evolution-chain/PokemonEvolutionChainModal';
import { showEvolutionChainNew, loadCountPokemonList } from '../../store/pokemon-preview/actions.chain';
import { ISpecies } from '../../utils/loading.service';

export interface IAppProps {
  filter: IPokemonFilterState;
  pagination: IPaginationState;
  pokemonCount: number;
  getPokemonList: (offset?: number, limit?: number) => void;
  showPokemons: (pokemons: IPokemonAPIResource[]) => void;
  loadCountPokemonList: () => void;
  showEvolutionChainNew: (evolution_chain: ISpecies['evolution_chain']) => void;
}

class PokedexPage extends Component<IAppProps> {

  public render() {
    const { filter } = this.props;
    return (
      <Fragment>
        <PokemonEvolutionChainModal />
        <Loader />
        {filter.isUseFilter ?
          <PokedexPageByFilter
            pokemonList={filter.pokemonList}
            pagination={this.props.pagination}
            showPokemons={this.props.showPokemons}
            pokemonCount={this.props.pokemonCount} /> :
          <PokedexPageList
            getCountPokemonList={this.props.loadCountPokemonList}
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
  loadCountPokemonList,
  showEvolutionChainNew,
};
export default connect(mapStateToProps, mapDispatchToProps)(PokedexPage);
