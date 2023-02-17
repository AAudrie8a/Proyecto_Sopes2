import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data, options }) => {
  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;