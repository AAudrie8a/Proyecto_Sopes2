import { useEffect, useState } from 'react';
import './App.css';
import { GetCPUUsage } from "../wailsjs/go/sys/Stats";
import PieChart from './Graficas/Pie';
import MyLineChart from './Graficas/Linear';

function App() {
  const [resultText, setResultText] = useState('');
  const [disk, setDisk] = useState('');
  const [diskFree, setDiskFree] = useState('');
  const [diskTotal, setDiskTotal] = useState('');
  const [time, setTime] = useState(new Date());
  const [chartData, setChartData] = useState({
    labels: ['Disco Utilizado', 'Disco Libre'],
    datasets: [
      {
        data: [3, 8],
        // backgroundColor: ['#00BFFF', '#4B0082'],
        // hoverBackgroundColor: ['#00FFFF', '#800080']
        // backgroundColor: ['#6495ED', '#9400D3'],
        // hoverBackgroundColor: ['#00CED1', '#FF69B4']
        // backgroundColor: ['#1E90FF', '#483D8B'],
        // hoverBackgroundColor: ['#00BFFF', '#FF1493']
        // backgroundColor: ['#4169E1', '#8A2BE2'],
        // hoverBackgroundColor: ['#00CED1', '#DA70D6']
        backgroundColor: ['#87CEEB', '#20B2AA'],
        hoverBackgroundColor: ['#ADD8E6', '#00FA9A']
      }
    ]
  });
  const [lineChartData, setLineChartData] = useState({
    labels: [`${time.getHours()}:${time.getMinutes()}`],
    datasets: [
      {
        label: '% CPU en Uso',
        data: [1],
        fill: true,
        borderColor: '#20B2AA'
      }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      GetCPUUsage().then((result) => {
        updateResultText(result);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const updateResultText = (result) => {
    const currentTime = new Date();
    setResultText(`${result.avg}%`);
    setDisk(`${result.disk} GB`);
    setDiskFree(`${result.disk_free} GB`);
    setDiskTotal(`${result.total_disk} GB`);
    setTime(new Date());
    setChartData({
      labels: ['Disco Utilizado', 'Disco Libre'],
      datasets: [
        {
          data: [result.disk, result.disk_free],
          backgroundColor: ['#87CEEB', '#20B2AA'],
        hoverBackgroundColor: ['#ADD8E6', '#00FA9A']
        }
      ]
    });
    setLineChartData((prevState) => {
      const newLabels = [...prevState.labels, `${currentTime.getHours()}:${currentTime.getMinutes()}`];
      const newData = [...prevState.datasets[0].data, result.avg];
      return {
        labels: newLabels,
        datasets: [
          {
            ...prevState.datasets[0],
            data: newData
          }
        ]
      };
    });
  };

  return (
    <div id="App">
      <div className='Resultados'>
        <div id="result" className="result"><h1>Hora: </h1><span>{` ${time.getHours()}:${time.getMinutes()}`}</span></div>
        <div id="result" className="result"><h1>CPU_Usage: </h1><span>{resultText}</span></div>
        <div id="result" className="result"><h1>Disco Utilizado: </h1><span>{disk}</span></div>
        <div id="result" className="result"><h1>Disco Libre: </h1><span>{diskFree}</span></div>
        <div id="result" className="result"><h1>Disco Total: </h1><span>{diskTotal}</span></div>
      </div>

      <div id="Graficas">
        <div id="Pie">
          <h2>Disco</h2>
          <PieChart data={chartData} />
        </div>
        <div id="Linea">
          <h2>CPU</h2>
          <MyLineChart data={lineChartData} />
        </div>
      </div>
    </div>
  );
}

export default App;
