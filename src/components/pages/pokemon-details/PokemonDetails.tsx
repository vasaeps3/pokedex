import React, { Component, Fragment } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IPokemon } from '../../../interfaces/pokemon.interface';
import { pokemonService } from '../../../services/pokemon.service';
import { Pokemon } from '../../pokemon-card/PokemonCard';
import PokemonLinkChain from '../../pokemon-evolution-chain/PokemonLinkChain';
import PokemonMoviesContainer from '../../pokemon-moves/PokemonMoviesContainer';


interface IAppState {
  pokemon: IPokemon | null;
  error: boolean;
}

export interface IAppProps extends RouteComponentProps<{ pokemonName: string }> { }

export default class PokemonDetails extends Component<IAppProps, IAppState> {
  public state: IAppState = {
    pokemon: null,
    error: false,
  };

  public async componentDidMount() {
    const { pokemonName } = this.props.match.params;
    try {
      const pokemon = await pokemonService.loadPokemonByName(pokemonName);
      this.setState({ pokemon });
    } catch {
      this.setState({ error: true });
    }
  }

  public render() {
    const { pokemon } = this.state;
    if (this.state.error) {
      return <Redirect to="/" />;
    }

    if (!pokemon) {
      return null;
    }

    return (
      <Fragment>
        <div className="pokemon-details">
          <Pokemon pokemon={pokemon} />
          <PokemonLinkChain evolutionChain={pokemon.species.evolution_chain} />
        </div>
        <PokemonMoviesContainer moves={pokemon.moves} />
      </Fragment>
    );
  }
}
