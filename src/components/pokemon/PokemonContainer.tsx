import * as React from 'react';

import { IPokemon } from '../../interfaces/pokemons.interface';
import { getPokemonByName } from '../../utils/pokemon.service';


export interface IAppProps {
  pokemon: IPokemon
}
export interface IAppState {
  pokemon: IPokemon;
}

export default class PokemonContainer extends React.Component<IAppProps, IAppState> {

  async componentDidMount() {
    const pokemon = await this.loadPokemonInfo();
    this.setState({ pokemon });
  }

  private loadPokemonInfo(): Promise<IPokemon> {
    return getPokemonByName(this.props.pokemon.name);
  }

  public render() {
    console.log(this.state);
    return (
      <div className="infocard">
        <h1>{this.props.pokemon.name}</h1>
      </div>
    );
  }
}
