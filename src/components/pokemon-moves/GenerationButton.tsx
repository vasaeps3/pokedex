import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';

import config from '../../env';
import { IGeneration } from '../../interfaces/generation.interface';


interface IGenerationButtonProps {
  generation: IGeneration;
  activeGeneration: string | null;
  handleClick: (generationName: string) => void;
}
export const GenerationButton: FunctionComponent<IGenerationButtonProps> = (props) => {
  const { generation, activeGeneration } = props;
  const title = generation.names.find((n) => n.language.name === config.language) || { name: {} };

  const handleClick = (generationName: string) => {
    props.handleClick(generationName);
  };

  return (
    <Button
      key={generation.name}
      variant="link"
      active={generation.name === activeGeneration}
      onClick={() => handleClick(generation.name)}
    >
      {title.name}
    </Button>
  );
};
