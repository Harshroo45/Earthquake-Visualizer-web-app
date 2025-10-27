
import React from 'react';

const legendData = [
  { depth: '< 10 km', color: '#4CAF50' },
  { depth: '10 - 30 km', color: '#FDD835' },
  { depth: '30 - 70 km', color: '#FB8C00' },
  { depth: '> 70 km', color: '#E53935' },
];

const Legend = () => {
  return (
    <div className="legend">
      <h4>Depth Legend</h4>
      {legendData.map((item, index) => (
        <div key={index} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: item.color }}
          ></span>
          <span>{item.depth}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
