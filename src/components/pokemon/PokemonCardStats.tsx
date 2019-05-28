import React, { FunctionComponent, Fragment } from 'react';

import Barchart from '../barchart/Barchart';
import { IPokemon, IStatsPokemon } from '../../interfaces/pokemons.interface';
import PokedexTable from '../common/pokedex-table/PokedexTable';
import PokedexTableCell from '../common/pokedex-table/PokedexTableCell';
import PokedexTableRow from '../common/pokedex-table/PokedexTableRow';


export const PokemonCardStats: FunctionComponent<{ stats: IPokemon['stats'] }> = ({ stats }) => {
  const hpStat = stats.find(st => st.stat.name === 'hp');
  const attackStat = stats.find(st => st.stat.name === 'attack');
  const defenseStat = stats.find(st => st.stat.name === 'defense');
  const spAtkStat = stats.find(st => st.stat.name === 'special-attack');
  const spDefStat = stats.find(st => st.stat.name === 'special-defense');
  const speedStat = stats.find(st => st.stat.name === 'speed');

  return (
    <div className="pokemon-card-section">
      <h5>Base stats</h5>
      <PokedexTable className={'stats-table'}>
        {hpStat && <PokemonCardStatsCell title={'HP'} stat={hpStat} />}
        {attackStat && <PokemonCardStatsCell title={'Attack'} stat={attackStat} />}
        {defenseStat && <PokemonCardStatsCell title={'Defence'} stat={defenseStat} />}
        {spAtkStat && <PokemonCardStatsCell title={'Sp. Atk'} stat={spAtkStat} />}
        {spDefStat && <PokemonCardStatsCell title={'Sp. Def'} stat={spDefStat} />}
        {speedStat && <PokemonCardStatsCell title={'Speed'} stat={speedStat} />}
      </PokedexTable>
    </div>
  )
};

const PokemonCardStatsCell = ({ title, stat }: { title: string, stat: IStatsPokemon }) => (
  <Fragment>
    <PokedexTableRow>
      <PokedexTableCell>{title}</PokedexTableCell>
      <PokedexTableCell>{stat.base_stat || '-'}</PokedexTableCell>
      <PokedexTableCell>
        <Barchart value={stat.base_stat || 0} />
      </PokedexTableCell>
    </PokedexTableRow>
  </Fragment>
);