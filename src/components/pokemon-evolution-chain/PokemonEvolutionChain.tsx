import React, { Fragment, Component } from 'react';
import Tree from 'react-d3-tree';

import PokemonChainInfo from './PokemonChainInfo';
import { IChainLink, IEvolutionDetails, IPokemon } from '../../interfaces/pokemon.interface';


interface IAppProps {
  chain: IChainLink;
}

class PokemonEvolutionChain extends Component<IAppProps> {
  private treeContainer: any;

  state = {
    translate: { x: 0, y: 0 },
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const dimensions = this.treeContainer.getBoundingClientRect();
    if (dimensions && dimensions.width !== 0 && prevState.translate.x === 0) {
      this.setState({
        translate: {
          x: dimensions.width / 2,
          y: 100
        }
      });
    }
  }

  private mapChain = (chain: IChainLink): any => {
    return {
      evolution_details: chain.evolution_details,
      pokemon: chain.pokemon,
      children: chain.evolves_to.map(c => this.mapChain(c)),
    }
  };

  render() {
    const { chain } = this.props;

    return (
      <Fragment>
        <div ref={tc => (this.treeContainer = tc)} >
          <div id="treeWrapper" style={{ height: 'calc(100vh - 160px)', width: '100%' }}>
            <Tree
              data={this.mapChain(chain)}
              collapsible={true}
              allowForeignObjects
              nodeLabelComponent={{
                render: <NodeLabel />,
                foreignObjectWrapper: {
                  width: 120,
                  height: 170,
                  x: -60,
                  y: -80,
                }
              }}
              translate={this.state.translate}
              orientation="vertical"
              circleRadius={1}
              depthFactor={200}
            />
          </div>
        </div>
      </Fragment >
    )
  }
};
export default PokemonEvolutionChain;


class NodeLabel extends React.PureComponent<any> {
  render() {
    const { nodeData } = this.props;
    const pokemon: IPokemon = nodeData.pokemon;
    const evolutionDetails: IEvolutionDetails[] = nodeData.evolution_details;
    return (
      <PokemonChainInfo pokemon={pokemon} evolutionDetails={evolutionDetails} />
    )
  }
}