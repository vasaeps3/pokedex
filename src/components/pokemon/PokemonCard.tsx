import React, { Component, FunctionComponent, Fragment } from 'react';

import './PokemonCard.scss';
import { IPokemon } from '../../interfaces/pokemons.interface';
import { PokemonCardImg } from './PokemonCardImg';
import { PokemonCardData } from './PokemonCardData';
import { getPokemonByName } from '../../utils/pokemon.service';


export interface IAppProps {
  pokemon: IPokemon
}
export interface IAppState {
  pokemon: IPokemon;
}

export default class PokemonCard extends Component<IAppProps, IAppState> {

  async componentDidMount() {
    const pokemon = await this.loadPokemonInfo();
    this.setState({ pokemon });
  }

  private loadPokemonInfo(): Promise<IPokemon> {
    return getPokemonByName(this.props.pokemon.name);
  }

  public render() {
    const pokemonEmptyLayout = <h1>ЖОПА!</h1>;
    console.log(this.state && this.state.pokemon);
    return (
      <div className="col-12 col-lg-6">
        <div className="pokemon-card">
          {this.state && this.state.pokemon ? <Pokemon pokemon={this.state.pokemon} /> : pokemonEmptyLayout}
        </div>
      </div>
    );
  }
}

const Pokemon: FunctionComponent<{ pokemon: IPokemon }> = ({ pokemon }) => (
  <Fragment>
    <div className="pokemon-card-info row">
      <div className="col-12 col-sm-6">
        <PokemonCardImg pokemon={pokemon} />
      </div>
      <div className="col-12 col-sm-6">
        <PokemonCardData pokemon={pokemon} />
      </div>
    </div>
  </Fragment>
);
