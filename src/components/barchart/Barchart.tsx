import React, { FunctionComponent } from 'react';

import './Barchart.scss';


const getBarchartStyle = (value: number, maxWight: number): { color: string, value: number } => {
  if (0 < value && value < 25) {
    return { color: '#f34444', value };
  }
  if (25 <= value && value < 50) {
    return { color: '#ff7f0f', value };
  }
  if (50 <= value && value < 75) {
    return { color: '#ffdd57', value };
  }
  if (75 <= value && value < 110) {
    return { color: '#a0e515', value };
  }
  if (110 <= value && value <= maxWight) {
    return { color: '#00c2b8', value };
  }

  return { color: '#000', value: 0 };
}

const Barchart: FunctionComponent<{ value: number }> = ({ value = 0 }) => {
  const maxWight = 180;
  const barchartStyle = getBarchartStyle(value, maxWight);
  return (
    <div className="barchart">
      <div className="barchart-bar" style={{ backgroundColor: barchartStyle.color, width: `${Math.round(barchartStyle.value / maxWight * 10000) / 100}%` }}></div>
    </div>
  );
};

export default Barchart;