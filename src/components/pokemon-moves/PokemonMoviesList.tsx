import React, { Component } from 'react';

import { IGeneration } from '../../interfaces/generation.interface';


interface IAppProps {
  // generationList: IGeneration[];
  // activeGeneration: string | null;
}
interface IAppState { }

export default class PokemonMoviesList extends Component<IAppProps, IAppState> {
  public render() {
    // const { activeGeneration, generationList } = this.props;
    // console.log(generationList);
    return (
      <div>
        asdads
        {/* {activeGeneration} */}
      </div>
    );
  }
}
