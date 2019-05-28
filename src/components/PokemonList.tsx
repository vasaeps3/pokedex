import * as React from 'react';
import { connect } from 'react-redux';

import { getPokemons } from '../store/pokemon/actions';
import { IPokemonState } from '../interfaces/pokemons.interface';
import PokemonCard from './pokemon/PokemonCard';
import Pagination from './common/pagination/Pagination';


export interface IAppProps {
  getPokemons: any;
  pokemons: IPokemonState;
}

export interface IAppState {
}
class PokemonList extends React.Component<IAppProps, IAppState> {

  componentDidMount() {
    this.getPokemons();
  }

  private getPokemons() {
    this.props.getPokemons()
  }

  public render() {
    const { pokemons } = this.props;
    console.log(this.props);
    const pokemonList = pokemons.results.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} />)
    return (
      <div className="container pokemon-list">
        <Pagination count={pokemons.count}></Pagination>
        <div className="row">
          {pokemonList}
        </div>
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