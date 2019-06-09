import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
import { Accordion } from 'react-bootstrap';


import { IMovesLearntBy, IPokemonMove } from '../../interfaces/pokemon.interface';
import PokemonMovesLearntBy from './PokemonMovesLearntBy';


interface IAppProps {
  movesList: IPokemonMove[];
  versionGroup: string;
}

export default class PokemonMovesList extends Component<IAppProps> {

  public shouldComponentUpdate(nextProps: IAppProps) {
    return !isEqual(this.props.movesList, nextProps.movesList);
  }

  public render() {
    const learntList: IMovesLearntBy[] = this.findLearntList();

    return (
      <Accordion>
        {learntList.map((l) => <PokemonMovesLearntBy key={l.leartMethod.name} movesLearntBy={l} />)}
      </Accordion>
    );
  }

  private findLearntList = () => {
    const learntList: IMovesLearntBy[] = [];

    this.props.movesList.forEach((move) => {
      const versionGroupDetail = move.version_group_details
        .find((d) => d.version_group.name === this.props.versionGroup);

      if (!versionGroupDetail) {
        return;
      }

      const key = versionGroupDetail.move_learn_method.name;
      const movesByGroupList = learntList.find((e) => e.leartMethod.name === key);

      if (!movesByGroupList) {
        learntList.push({
          leartMethod: versionGroupDetail.move_learn_method,
          move: [move.move],
        });
      } else {
        movesByGroupList.move.push(move.move);
      }

    });

    return learntList;
  }

}
