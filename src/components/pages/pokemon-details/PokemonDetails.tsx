import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { IPokemon } from '../../../interfaces/pokemon.interface';
import { pokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../pokemon-card/PokemonCard';
import PokemonMoviesContainer from '../../pokemon-moves/PokemonMoviesContainer';


interface IAppState {
  pokemon: IPokemon | null;
}

export interface IAppProps extends RouteComponentProps<{ pokemonName: string }> { }

export default class PokemonDetails extends Component<IAppProps, IAppState> {
  public state: IAppState = {
    pokemon: null,
  };

  public async componentDidMount() {
    const { pokemonName } = this.props.match.params;
    try {
      const pokemon = await pokemonService.loadPokemonByName(pokemonName);
      this.setState({ pokemon });
    } catch {
      // TODO!
    }
  }

  public render() {
    const { pokemon } = this.state;

    if (!pokemon) {
      return null;
    }

    return (
      <Fragment>
        <div className="pokemon-details">
          <Pokemon pokemon={pokemon} />
        </div>
        <PokemonMoviesContainer moves={pokemon.moves} />
      </Fragment>
    );
  }
}
