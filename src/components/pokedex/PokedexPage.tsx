import React, { Component } from 'react';
import { connect } from 'react-redux';

// import PokemonList from '../PokemonList';
import { getPokemonList } from '../../store/pokemon-preview/actions';

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
        {/* <PokemonList /> */}
      </div>
    );
  }
}

const mapDispatchToProps = { getPokemonResource: getPokemonList };

export default connect(null, mapDispatchToProps)(PokedexPage);
