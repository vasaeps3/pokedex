import React, { Component, Fragment, FunctionComponent } from 'react';
import Tree from 'react-d3-tree';

import { IChainLink, IEvolutionDetails, IPokemon } from '../../interfaces/pokemon.interface';
import PokemonChainInfo from './PokemonChainInfo';


interface IAppProps {
  chain: IChainLink;
}

class PokemonEvolutionChain extends Component<IAppProps> {
  public state = {
    translate: { x: 0, y: 0 },
  };

  private treeContainer: any;

  public componentDidUpdate(prevProps: any, prevState: any) {
    const dimensions = this.treeContainer.getBoundingClientRect();
    if (dimensions && dimensions.width !== 0 && prevState.translate.x === 0) {
      this.setState({
        translate: {
          x: dimensions.width / 2,
          y: 100,
        },
      });
    }
  }

  public render() {
    const { chain } = this.props;
    const nodeLabelComponent = {
      render: <NodeChain />,
      foreignObjectWrapper: {
        width: 120,
        height: 170,
        x: -60,
        y: -80,
      },
    };

    return (
      <Fragment>
        <div ref={(tc) => (this.treeContainer = tc)} >
          <div id="treeWrapper" style={{ height: 'calc(100vh - 160px)', width: '100%' }}>
            <Tree
              data={this.mapChain(chain)}
              collapsible={true}
              allowForeignObjects={true}
              nodeLabelComponent={nodeLabelComponent}
              translate={this.state.translate}
              orientation="vertical"
              circleRadius={1}
              depthFactor={200}
            />
          </div>
        </div>
      </Fragment >
    );
  }

  private mapChain = (chain: IChainLink): any => {
    return {
      evolution_details: chain.evolution_details,
      pokemon: chain.pokemon,
      children: chain.evolves_to.map((c) => this.mapChain(c)),
    };
  }
}

export default PokemonEvolutionChain;

const NodeChain: FunctionComponent = (props: any) => {
  const { nodeData } = props;
  const pokemon: IPokemon = nodeData.pokemon;
  const evolutionDetails: IEvolutionDetails[] = nodeData.evolution_details;

  return <PokemonChainInfo pokemon={pokemon} evolutionDetails={evolutionDetails} />;
};
