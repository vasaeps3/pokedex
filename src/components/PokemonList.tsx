import * as React from 'react';
import { connect } from 'react-redux';

import { getPokemons } from '../store/pokemon/actions';
import { IPokemonState } from '../interfaces/pokemons.interface';
import PokemonContainer from './pokemon/PokemonContainer';


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
    const pokemonList = pokemons.results.map(pok => <PokemonContainer key={pok.name} pokemon={pok} />)
    console.log(this.props);
    return (
      <div>
        {pokemonList}
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