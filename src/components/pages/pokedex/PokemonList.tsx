import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row } from 'react-bootstrap';
import { INamedAPIResource } from '../../../interfaces/base.interface';
import { IPokemon } from '../../../interfaces/pokemon.interface';
import { getPokemonsFull, showEvolutionChainNew } from '../../../store/pokemon-preview/actions';
import { IPokemonAPIResourceState } from '../../../store/pokemon-preview/reducer';
import PokemonCard from '../../pokemon-card/PokemonCard';
import './PokemonList.scss';


export interface IAppProps {
  getPokemonsFull: (pokemonsShort: INamedAPIResource[]) => void;
  pokemonsShort: INamedAPIResource[];
  pokemonsFull: IPokemon[];
}

class PokemonList extends Component<IAppProps> {

  public componentDidUpdate(prevProps: IAppProps) {
    if (!isEqual(prevProps.pokemonsShort, this.props.pokemonsShort)) {
      this.props.getPokemonsFull(this.props.pokemonsShort);
    }
  }

  public render() {
    const pokemonList = this.props.pokemonsFull.map((pokemon) => (
      <PokemonCard
        key={pokemon.name}
        pokemon={pokemon}
      />
    ));

    return (
      <Container className="pokemon-list">
        <Row>
          {pokemonList}
        </Row>
      </Container>
    );
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
