import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import { connect } from 'react-redux';
import { IState } from '../../store/reducers';
import { IChainLink } from '../../utils/loading.service';
import PokemonEvolutionChain from './PokemonEvolutionChain';
import { hideEvolutionChain } from '../../store/pokemon-preview/actions';


interface IAppProps {
  chain: IChainLink | null;
  hideEvolutionChain: () => void;
}

class PokemonEvolutionChainModal extends Component<IAppProps> {

  private handleClose = () => {
    this.props.hideEvolutionChain();
  }

  render() {
    const { chain } = this.props;
    if (!chain) {
      return null;
    }

    return (
      <Modal show={true} onHide={this.handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Evolution chain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PokemonEvolutionChain chain={chain} />
        </Modal.Body>
      </Modal>
    )
  }
};

const mapStateToProps = (state: IState) => ({ chain: state.pokemonPreview.chain });
const mapDispatchToProps = { hideEvolutionChain };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonEvolutionChainModal);