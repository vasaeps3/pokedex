import React, { Component } from 'react';
import { Accordion, Button, Card, Spinner, Badge } from 'react-bootstrap';

import config from '../../env';
import { IMovesLearntBy } from '../../interfaces/pokemon.interface';
import { pokemonService } from '../../services/pokemon.service';
import { loadTranslationsService } from '../../services/load-translations.service';


interface IAppProps {
  movesLearntBy: IMovesLearntBy;
}

interface IAppState {
  isLoading: boolean;
  methodName: string | null;
  methodDesc: string | null;
}

export default class PokemonMovesLearntBy extends Component<IAppProps> {

  public state: IAppState = {
    isLoading: true,
    methodName: null,
    methodDesc: null,
  };

  public async componentDidMount() {
    const moveLearnMethod = await pokemonService.getMoveLearnMethod(this.props.movesLearntBy.leartMethod.url);
    const methodName = moveLearnMethod.names.find((n) => n.language.name === config.language) || { name: '' };
    const methodDesc = moveLearnMethod.descriptions
      .find((d) => d.language.name === config.language) || { description: '' };

    await Promise.all(this.props.movesLearntBy.move.map((m) => loadTranslationsService.loadTranslateData(m)));

    this.setState({
      isLoading: false,
      methodName: methodName.name,
      methodDesc: methodDesc.description,
    });
  }

  public render() {
    const cardHeader = this.state.isLoading ?
      <Spinner animation="border" variant="dark" size="sm" /> :
      this.state.methodName;

    const cardBody = this.state.isLoading ?
      <Spinner animation="border" variant="dark" size="sm" /> :
      (this.props.movesLearntBy.move.map((m) => <Badge key={m.name} variant="info" >{m.title}</Badge>));

    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={this.props.movesLearntBy.leartMethod.name}>
            {cardHeader}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={this.props.movesLearntBy.leartMethod.name}>
          <Card.Body>{cardBody}</Card.Body>
        </Accordion.Collapse>
      </Card >
    );
  }
}
