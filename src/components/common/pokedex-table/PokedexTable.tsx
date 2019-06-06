import React, { FunctionComponent } from 'react';

import './PokemonTable.scss';


interface IPokedexTableProps {
  className?: string;
}

const PokedexTable: FunctionComponent<IPokedexTableProps> = (props) => (
  <div className={`pokedex-table ${props.className}`}>{props.children}</div>
);

export default PokedexTable;
