import React, { FunctionComponent, Fragment } from 'react';
import { cmp } from 'type-comparator';

import Barchart from '../barchart/Barchart';
import { IStat } from '../../interfaces/pokemon.interface';
import PokedexTable from '../common/pokedex-table/PokedexTable';
import PokedexTableCell from '../common/pokedex-table/PokedexTableCell';
import PokedexTableRow from '../common/pokedex-table/PokedexTableRow';


const abbreviations: { [key: string]: string } = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-defense': 'Sp. Atk',
  'special-attack': 'Sp. Def',
  'speed': 'Speed',
}
const array = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

export const PokemonCardStats: FunctionComponent<{ stats: IStat[] }> = ({ stats }) => {

  const comparator = cmp()
    .map(x => array.indexOf(x.stat.name))
    .asc();

  stats.sort(comparator);

  return (
    <div className="pokemon-card-section">
      <h5>Base stats</h5>
      <PokedexTable className={'stats-table'}>
        {stats.map((s, idx) => <PokemonCardStatsCell key={idx} stat={s} />)}
      </PokedexTable>
    </div>
  )
};

const PokemonCardStatsCell = ({ stat }: { stat: IStat }) => (
  <Fragment>
    <PokedexTableRow>
      <PokedexTableCell>{abbreviations[stat.stat.name]}</PokedexTableCell>
      <PokedexTableCell>{stat.base_stat || '-'}</PokedexTableCell>
      <PokedexTableCell>
        <Barchart value={stat.base_stat || 0} />
      </PokedexTableCell>
    </PokedexTableRow>
  </Fragment>
);

