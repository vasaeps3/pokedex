import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPokemons } from '../store/pokemon/actions';
import { IPokemonState } from '../interfaces/pokemons.interface';
import PokemonCard from './pokemon/PokemonCard';
import Paginations from './common/pagination/Pagination';


export interface IAppProps {
  getPokemons: (offset?: number, limit?: number) => void;
  pokemons: IPokemonState;
}

export interface IAppState {
}
class PokemonList extends Component<IAppProps, IAppState> {

  getPokemons = (offset?: number, limit?: number) => {
    this.props.getPokemons(offset, limit)
  }

  public render() {
    const { pokemons } = this.props;
    const pokemonList = pokemons.results.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} />)
    return (
      <div className="container pokemon-list">
        <div className="row">
          {pokemonList}
        </div>
        <Paginations count={pokemons.count} onChangePage={this.getPokemons}></Paginations>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({ pokemons: state.pokemons })
const mapActionsToProps = {
  getPokemons
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(PokemonList);