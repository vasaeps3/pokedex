import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import { IGeneration } from '../../interfaces/generation.interface';
import { IPokemonMove, IPokemonMoveVersion } from '../../interfaces/pokemon.interface';
import PokemonMovesList from './PokemonMovesList';


interface IAppProps {
  generation: IGeneration | null;
  movesList: IPokemonMove[];
}

interface IAppState {
  versionGroup: string;
  movesByVersion: IPokemonMove[];
}

export default class PokemonMoviesGroupList extends Component<IAppProps, IAppState> {
  public state = {
    versionGroup: '',
    movesByVersion: [],
  };

  public componentDidUpdate(prevProps: IAppProps) {
    if (!this.props.generation) {
      return;
    }

    if ((prevProps.generation && prevProps.generation.name) !== this.props.generation.name) {
      this.onSelectTab(this.props.generation.version_groups[0].name);
    }
  }

  public render() {
    const { generation } = this.props;

    if (!generation) {
      return null;
    }

    const movesList: JSX.Element[] = (
      generation.version_groups.map((g) => (
        <Tab key={g.name} eventKey={g.name} title={g.title}>
          <PokemonMovesList versionGroup={this.state.versionGroup} movesList={this.state.movesByVersion} />
        </Tab>
      ))
    );

    return (
      <div>
        <Tabs
          id="moves-tabs"
          onSelect={(key: any) => this.onSelectTab(key)}
          activeKey={this.state.versionGroup}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          {movesList}
        </Tabs>
      </div>
    );
  }

  private onSelectTab = (versionGroup: string) => {
    const movesByVersion = this.getMovesByVersion(versionGroup);
    this.setState({
      versionGroup,
      movesByVersion,
    });
  }

  private getMovesByVersion = (versionGroup: string): IPokemonMove[] => {
    const movesByVersion = this.props.movesList.filter((move: IPokemonMove) => {
      return !!move.version_group_details
        .filter((pokemonVersion: IPokemonMoveVersion) => pokemonVersion.version_group.name === versionGroup)
        .length;
    });

    return movesByVersion;
  }
}
