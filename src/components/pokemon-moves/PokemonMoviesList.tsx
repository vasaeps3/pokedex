import React, { Component } from 'react';

import { IGeneration } from '../../interfaces/generation.interface';
import PokemonMoviesGroupList from './PokemonMoviesGroupList';
import { Tabs, Tab } from 'react-bootstrap';


interface IAppProps {
  generation: IGeneration | null;
  // activeGeneration: string | null;
}
interface IAppState { }

export default class PokemonMoviesList extends Component<IAppProps, IAppState> {

  public render() {
    const { generation } = this.props;
    if (!generation) {
      return null;
    }

    return (
      <div>
        {/* <PokemonMoviesGroupList /> */}
        {/* {activeGeneration} */}
        <Tabs
          id="controlled-tab-example"
        // activeKey={this.state.key}
        // onSelect={key => this.setState({ key })}
        >
          {generation.version_groups.map(g => <Tab key={g.name} eventKey={g.name} title={g.name}>{g.name}</Tab>)}
        </Tabs>
      </div>
    );
  }
}
