import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./styles/Pie.css"

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({ data }) => {
  return (
    <div>
      <Pie data={data} />
    </div>
    
  );
};

export default PieChart;