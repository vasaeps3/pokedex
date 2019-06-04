import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';


import PokemonCard from './pokemon-card/PokemonCard';
import { IPokemonAPIResourceState } from '../store/pokemon-preview/reducer';
import { showEvolutionChainNew, getPokemonsFull } from '../store/pokemon-preview/actions.chain';
import { INamedAPIResource, ISpecies, IPokemon } from '../interfaces/pokemon.interface';


export interface IAppProps {
  getPokemonsFull: (pokemonsShort: INamedAPIResource[]) => void;
  showEvolutionChainNew: (evolution_chain: ISpecies['evolution_chain']) => void;
  pokemonsShort: INamedAPIResource[];
  pokemonsFull: IPokemon[];
}

class PokemonList extends Component<IAppProps> {

  componentDidUpdate(prevProps: IAppProps) {
    if (!isEqual(prevProps.pokemonsShort, this.props.pokemonsShort)) {
      this.props.getPokemonsFull(this.props.pokemonsShort);
    }
  }

  private handleClick = (evolution_chain: ISpecies['evolution_chain']) => {
    this.props.showEvolutionChainNew(evolution_chain);
  }

  public render() {
    const pokemonList = this.props.pokemonsFull.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} handleClick={this.handleClick} />)

    return (
      <div className="container pokemon-list">
        <div className="row">
          {pokemonList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ pokemonPreview }: { pokemonPreview: IPokemonAPIResourceState }) => ({
  pokemonsShort: pokemonPreview.pokemonsShort,
  pokemonsFull: pokemonPreview.pokemonsFull,
});

const mapActionsToProps = {
  getPokemonsFull,
  showEvolutionChainNew,
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(PokemonList);