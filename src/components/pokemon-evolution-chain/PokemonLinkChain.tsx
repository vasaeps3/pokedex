import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import { ISpecies } from '../../interfaces/pokemon.interface';
import { showEvolutionChainNew } from '../../store/pokemon-preview/actions';


export interface IAppProps {
  evolutionChain: ISpecies['evolution_chain'];
  showEvolutionChainNew: (evolutionChain: ISpecies['evolution_chain']) => void;
}

class PokemonLinkChain extends Component<IAppProps> {

  public render() {
    return (
      <Container className="mt-4">
        <Button variant="link" onClick={this.handleClick}>
          Show evolution chain
        </Button>
      </Container>
    );
  }

  private handleClick = () => {
    this.props.showEvolutionChainNew(this.props.evolutionChain);
  }
}

const mapActionsToProps = {
  showEvolutionChainNew,
};

export default connect(null, mapActionsToProps)(PokemonLinkChain);
