import React, { Component, FunctionComponent, memo } from 'react';
import { Accordion, Button, Card, Spinner } from 'react-bootstrap';

import config from '../../env';
import { IMove, IMovesLearntBy } from '../../interfaces/pokemon.interface';
import { pokemonService } from '../../services/pokemon.service';
import { PokemonType } from '../common/pokemon';


interface IAppProps {
  movesLearntBy: IMovesLearntBy;
}

interface IAppState {
  isLoading: boolean;
  methodName: string | null;
  methodDesc: string | null;
  movesLearntBy: IMove[];
}

export default class PokemonMovesLearntBy extends Component<IAppProps> {

  public state: IAppState = {
    isLoading: true,
    methodName: null,
    methodDesc: null,
    movesLearntBy: [],
  };

  public async componentDidMount() {
    const moveLearnMethod = await pokemonService.getMoveLearnMethod(this.props.movesLearntBy.leartMethod.url);
    const methodName = moveLearnMethod.names.find((n) => n.language.name === config.language) || { name: '' };
    const methodDesc = moveLearnMethod.descriptions
      .find((d) => d.language.name === config.language) || { description: '' };

    const movesLearntBy = await Promise.all(this.props.movesLearntBy.move.map((m) => pokemonService.getMove(m.url)));

    this.setState({
      isLoading: false,
      methodName: methodName.name,
      methodDesc: methodDesc.description,
      movesLearntBy,
    });
  }

  public render() {
    const cardHeader = this.state.isLoading ?
      <Spinner animation="border" variant="dark" size="sm" /> :
      this.state.methodName;

    const cardBody = this.state.isLoading ?
      <Spinner animation="border" variant="dark" size="sm" /> :
      (<Moves moves={this.state.movesLearntBy} />);

    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={this.props.movesLearntBy.leartMethod.name}>
            {cardHeader}
          </Accordion.Toggle>
          <span className="text-muted">({this.state.methodDesc})</span>
        </Card.Header>
        <Accordion.Collapse eventKey={this.props.movesLearntBy.leartMethod.name}>
          <Card.Body>{cardBody}</Card.Body>
        </Accordion.Collapse>
      </Card >
    );
  }
}

const Moves: FunctionComponent<{ moves: IMove[] }> = memo(({ moves }) => (
  <div className="pokemon-move-list">
    {moves.map((m) => <Move key={m.name} move={m} />)}
  </div>
));

const Move: FunctionComponent<{ move: IMove }> = memo(({ move }) => {
  const getMoveName = (moveData: IMove) => {
    const moveName = moveData.names.find((n) => n.language.name === config.language) || { name: '' };

    return moveName.name;
  };

  return (
    <div className="move-card">
      <div className="move-card-name">{getMoveName(move)}</div>
      <div className="move-card-type"><PokemonType type={move.type} /></div>
    </div>
  );
});
