import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import { connect } from 'react-redux';
import { IChainLink } from '../../interfaces/pokemon.interface';
import { hideEvolutionChain } from '../../store/pokemon-preview/actions';
import { IState } from '../../store/reducers';
import PokemonEvolutionChain from './PokemonEvolutionChain';


interface IAppProps {
  chain: IChainLink | null;
  hideEvolutionChain: () => void;
}

class PokemonEvolutionChainModal extends Component<IAppProps> {

  public render() {
    const { chain } = this.props;
    if (!chain) {
      return null;
    }

    return (
      <Modal show={true} onHide={this.handleClose} size="xl">
        <Modal.Header closeButton={true}>
          <Modal.Title>Evolution chain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PokemonEvolutionChain chain={chain} />
        </Modal.Body>
      </Modal>
    );
  }

  private handleClose = () => {
    this.props.hideEvolutionChain();
  }
}

const mapStateToProps = (state: IState) => ({ chain: state.pokemonPreview.chain });
const mapDispatchToProps = { hideEvolutionChain };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonEvolutionChainModal);
