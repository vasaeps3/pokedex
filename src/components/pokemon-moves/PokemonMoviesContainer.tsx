import React, { Component, Fragment } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

import { IGeneration } from '../../interfaces/generation.interface';
import { IPokemonMove } from '../../interfaces/pokemon.interface';
import { pokemonService } from '../../services/pokemon.service';
import PokemonGenerationList from './PokemonGenerationList';
import PokemonMoviesGroupList from './PokemonMoviesGroupList';


interface IAppProps {
  moves: IPokemonMove[];
}

interface IAppState {
  isLoading: boolean;
  generationList: IGeneration[];
  generation: IGeneration | null;
  activeGeneration: string | null;
  movesList: IPokemonMove[];
}

export default class PokemonMoviesContainer extends Component<IAppProps> {
  public state: IAppState = {
    isLoading: true,
    generationList: [],
    activeGeneration: null,
    generation: null,
    movesList: [],
  };

  public async componentDidMount() {
    const generationList: IGeneration[] = await pokemonService.getGenerationList();
    await Promise.all(generationList.map(g => pokemonService.loadTranslateVersionGroups(g)));

    this.setState({
      isLoading: false,
      generationList,
    });
  }

  public render() {
    const { generationList, activeGeneration } = this.state;

    const content = this.state.isLoading ?
      <Spinner animation="border" variant="dark" /> :
      (
        <Fragment>
          <Row>
            <Col>
              <PokemonGenerationList
                generationList={generationList}
                activeGeneration={activeGeneration}
                chooseGeneration={this.chooseGeneration}
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-4">
              <PokemonMoviesGroupList generation={this.state.generation} movesList={this.state.movesList} />
            </Col>
          </Row>
        </Fragment>
      );

    return (
      <Fragment>
        <Container>
          {content}
        </Container>
      </Fragment >
    );
  }

  private chooseGeneration = (activeGeneration: string) => {
    const generation = this.getGeneration(activeGeneration);
    const movesList = generation && this.filterMovesList(generation);

    this.setState({
      generation,
      activeGeneration,
      movesList,
    });
  }

  private getGeneration = (activeGeneration: string): IGeneration | null => {
    const generation = this.state.generationList.find((g) => g.name === activeGeneration) || null;

    return generation;
  }

  private filterMovesList = (generation: IGeneration): IPokemonMove[] => {
    if (!generation) {
      return [];
    }

    const movesList: IPokemonMove[] = this.props.moves.filter((move) => {
      return move.version_group_details.find((vg) => {
        return !!generation.version_groups.find((g) => g.name === vg.version_group.name);
      });
    }) || [];

    return movesList;
  }

}
