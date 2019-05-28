import React, { FunctionComponent } from 'react';


const PokedexTableRow: FunctionComponent = (props) => (
  <div className="pokedex-table-row">{props.children}</div>
);

export default PokedexTableRow;