import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';


import PokemonCard from './pokemon/PokemonCard';
import { getPokemonsFull } from '../store/pokemon-preview/actions';
import { IPokemonAPIResource, IPokemon } from '../interfaces/pokemons.interface';
import { IPokemonAPIResourceState } from '../store/pokemon-preview/reducer';


export interface IAppProps {
  getPokemonsFull: (pokemonsShort: IPokemonAPIResource[]) => void;
  pokemonsShort: IPokemonAPIResource[];
  pokemonsFull: IPokemon[];
}

class PokemonList extends Component<IAppProps> {

  componentDidUpdate(prevProps: IAppProps) {
    if (!isEqual(prevProps.pokemonsShort, this.props.pokemonsShort)) {
      this.props.getPokemonsFull(this.props.pokemonsShort);
    }
  }

  public render() {
    const pokemonList = this.props.pokemonsFull.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} />)

    return (
      <div className="container pokemon-list">
        {/* <Pagination count={pokemons.count}></Pagination> */}
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
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(PokemonList);