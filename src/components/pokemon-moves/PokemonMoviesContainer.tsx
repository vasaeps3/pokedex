import filter from 'lodash/filter';
import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { IGeneration } from '../../interfaces/generation.interface';
import { IPokemonMove } from '../../interfaces/pokemon.interface';
import { pokemonService } from '../../services/pokemon.service';
import PokemonGenerationList from './PokemonGenerationList';
import PokemonMoviesList from './PokemonMoviesList';


interface IAppProps {
  moves: IPokemonMove[];
}

interface IAppState {
  generationList: IGeneration[];
  generation: IGeneration | null;
  activeGeneration: string | null;
}

export default class PokemonMoviesContainer extends Component<IAppProps> {
  public state: IAppState = {
    generationList: [],
    activeGeneration: null,
    generation: null,
  };

  public async componentDidMount() {
    const generationList: IGeneration[] = await pokemonService.getGenerationList();
    this.setState({
      generationList,
    });
  }

  public render() {
    const { generationList, activeGeneration } = this.state;
    if (!generationList.length) {
      return null;
    }

    return (
      <Fragment>
        <Container>
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
            <PokemonMoviesList generation={this.state.generation} />
          </Row>
        </Container>
      </Fragment>
    );
  }

  private chooseGeneration = (activeGeneration: string) => {
    this.filterMovesList(activeGeneration);
    this.setState({ activeGeneration });
  }

  private filterMovesList = (activeGeneration: string) => {
    const generation = this.state.generationList.find((g) => g.name === activeGeneration);
    this.setState({ generation });

    if (!generation) {
      return;
    }
    console.log(generation);
    const aaaa = filter(this.props.moves, (move) => {
      return move.version_group_details.find((vg) => {
        return !!generation.version_groups.find((g) => g.name === vg.version_group.name);
      });
    });
    console.log(aaaa);
    // console.log(this.state.generationList);
  }

}
