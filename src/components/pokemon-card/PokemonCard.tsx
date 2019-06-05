import React, { FunctionComponent, Fragment } from 'react';

import './PokemonCard.scss';
import { PokemonImg } from '../common/pokemon-img/PokemonImg';
import { PokemonCardStats } from './PokemonCardStats';
import { PokemonCardData } from './PokemonCardData';
import { IPokemon, ISpecies } from '../../interfaces/pokemon.interface';
import { Container, Row, Col } from 'react-bootstrap';

interface IAppProps {
  pokemon: IPokemon;
  handleClick: (evolution_chain: ISpecies['evolution_chain']) => void;
}

const PokemonCard: FunctionComponent<IAppProps> = (props) => {

  const handleClick = () => {
    props.handleClick(pokemon.species.evolution_chain);
  }

  const { pokemon } = props;
  return (
    <div className="col-12 col-lg-6">
      <div className="pokemon-card" onClick={handleClick}>
        <Pokemon pokemon={pokemon} />
      </div>
    </div>
  );
}
export default PokemonCard;

const Pokemon: FunctionComponent<{ pokemon: IPokemon }> = ({ pokemon }) => (
  <Container>
    <Row className="pokemon-card-info">
      <Col xs={12} sm={4} md={5} lg={4} xl={5}>
        <PokemonImg sprites={pokemon.sprites} />
      </Col>
      <Col xs={12} sm={8} md={7} lg={8} xl={7}>
        <PokemonCardData pokemon={pokemon} />
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="pokemon-card-stats">
          <PokemonCardStats stats={pokemon.stats} />
        </div>
      </Col>
    </Row>
  </Container>
);
