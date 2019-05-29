import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';


import { getPokemons } from '../store/pokemon/actions';
import { IPokemonState, IPokemonAPIResource } from '../interfaces/pokemons.interface';
import PokemonCard from './pokemon/PokemonCard';
import Paginations from './common/pagination/Pagination';


export interface IAppProps {
  // getPokemons: (offset?: number, limit?: number) => void;
  pokemonsResource: IPokemonAPIResource[];
}

export interface IAppState {
}
class PokemonList extends Component<IAppProps, IAppState> {
  async componentDidUpdate(prevProps: IAppProps) {
    if (!isEqual(prevProps.pokemonsResource, this.props.pokemonsResource)) {
      console.log('tratata');
    }
  }

  public render() {
    console.log(this.props.pokemonsResource);
    return (
      <Fragment>
        12
      </Fragment>
    )
  }
}

const mapStateToProps = ({ pokemonResource }: { pokemonResource: { pokemons: IPokemonAPIResource[] } }) => ({ pokemonsResource: pokemonResource.pokemons });
const mapActionsToProps = {
  getPokemons,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(PokemonList);