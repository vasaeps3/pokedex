import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPokemonResource } from '../../store/pokemon-resource/actions';
import PokemonList from '../PokemonList';

export interface IAppProps {
  getPokemonResource: any;
}
export interface IAppState { }

class PokedexPage extends Component<IAppProps, IAppState> {

  componentDidMount() {
    this.props.getPokemonResource();
  }

  public render() {
    return (
      <div>
        <PokemonList />
      </div>
    );
  }
}
const mapDispatchToProps = { getPokemonResource };
export default connect(null, mapDispatchToProps)(PokedexPage);
