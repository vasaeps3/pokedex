import * as React from 'react';
import { connect } from 'react-redux';

import { getPokemons } from '../store/pokemon/actions';
import { IPokemonState } from '../interfaces/pokemons.interface';
import PokemonCard from './pokemon/PokemonCard';


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
    const pokemonList = pokemons.results.map(pok => <PokemonCard key={pok.name} pokemon={pok} />)
    return (
      <div className="container pokemon-list">
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