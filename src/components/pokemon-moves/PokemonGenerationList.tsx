import React, { Component } from 'react';
import { ButtonGroup } from 'react-bootstrap';

import { IGeneration } from '../../interfaces/generation.interface';
import { GenerationButton } from './GenerationButton';
import './PokemonGenerationList.scss';


export interface IAppProps {
  generationList: IGeneration[];
  activeGeneration: string | null;
  chooseGeneration: (activeGeneration: string) => void;
}

export default class PokemonGenerationList extends Component<IAppProps> {

  public componentDidMount() {
    const { generationList } = this.props;
    if (!!generationList.length) {
      this.chooseGeneration(generationList[0].name);
    }
  }

  public render() {
    const { generationList } = this.props;
    const generationListEl: JSX.Element[] = generationList.map((g) => (
      <GenerationButton
        key={g.name}
        generation={g}
        activeGeneration={this.props.activeGeneration}
        handleClick={this.chooseGeneration}
      />
    ));

    return (
      <ButtonGroup className="generation-button-list" size="sm" >
        {generationListEl}
      </ButtonGroup>
    );
  }

  private chooseGeneration = (activeGeneration: string) => {
    this.props.chooseGeneration(activeGeneration);
  }
}
