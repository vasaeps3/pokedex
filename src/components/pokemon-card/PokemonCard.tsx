import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { Col, Container, Row } from 'react-bootstrap';
import { IPokemon } from '../../interfaces/pokemon.interface';
import { PokemonImage } from '../common/pokemon/PokemonImage';
import './PokemonCard.scss';
import { PokemonCardData } from './PokemonCardData';
import { PokemonCardStats } from './PokemonCardStats';


interface IAppProps {
  pokemon: IPokemon;
}

const PokemonCard: FunctionComponent<IAppProps> = (props) => {
  const { pokemon } = props;

  return (
    <Col xs={12} lg={6}>
      <Link to={pokemon.name} className="pokemon-card">
        <Pokemon pokemon={pokemon} />
      </Link>
    </Col>
  );
};

export default PokemonCard;

export const Pokemon: FunctionComponent<{ pokemon: IPokemon }> = ({ pokemon }) => (
  <Container>
    <Row className="pokemon-card-info">
      <Col xs={12} sm={4} md={5} lg={4} xl={5}>
        <PokemonImage sprites={pokemon.sprites} />
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
