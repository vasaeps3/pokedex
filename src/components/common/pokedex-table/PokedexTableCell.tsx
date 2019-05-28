import React, { FunctionComponent } from 'react';


const PokedexTableCell: FunctionComponent = (props) => (
  <div className="pokedex-table-cell">{props.children}</div>
);

export default PokedexTableCell;