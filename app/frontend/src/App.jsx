import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {GetCPUUsage} from "../wailsjs/go/sys/Stats";
import PieChart from './Graficas/Pie';
import MyLineChart from './Graficas/Linear';

function App() {
    const [resultText, setResultText] = useState('');
    const [disk, setDisk] = useState('');
    const [disk_free, setDisk_free] = useState('');
    const [disk_total, setDisk_total] = useState('');
    const [time, setTime] = useState(new Date());
    const [tiempo, setTiempo] = useState([])
    const [percentCPU, setPercent] = useState([])
    const [data, setData] = useState({
        labels: ['Disco Utilizado', 'Disco Libre'],
        datasets: [
          {
            // data: [disk, disk_free, disk_total],
            data: [3,8],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB' ]
          }
        ]
    });
    const [dataLine, setDataLine] = useState({
      
      labels: ['0:0'],
      datasets: [
        {
          label: '% CPU en Uso',
          data: [1],
          fill: false,
          borderColor: '#4B7BEC'
        }
      ]
    });

    const updateResultText = (result) => {
        setResultText("CPU_Usage: "+result.avg + "%");
        setDisk("Disco Utilizado:"+result.disk+" GB");
        setDisk_free("Disco Libre: "+result.disk_free+" GB");
        setDisk_total("Disco Total: "+result.total_disk+" GB");
        setData({
            labels: ['Disco Utilizado', 'Disco Libre'],
            datasets: [
              {
                data: [result.disk, result.disk_free],
                // data: [5,6,11],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
              }
            ]
          });
          
          setTiempo(tiempo.concat(time.getHours()+":"+time.getMinutes()));
          console.log(tiempo)
          setPercent(percentCPU.concat(result.avg))
          console.log(percentCPU)
          setDataLine({
            
            labels: tiempo,
            datasets: [
              {
                label: '% CPU en Uso',
                data: percentCPU,
                fill: true,
                borderColor: '#4B7BEC'
              }
            ]
          });
    }

    function greet() {
        GetCPUUsage().then(updateResultText);
    }

    setInterval(greet, 10000);
    return (
        <div id="App">
            <div id="result" className="result">{resultText}</div>
            <div id="result" className="result">{disk}</div>
            <div id="result" className="result">{disk_free}</div>
            <div id="result" className="result">{disk_total}</div>
            <div id="Graficas">
              <div id="Pie">
              <PieChart data={data}/> 
              </div>
              <div id="Linea">
              <MyLineChart data={dataLine}/>
              </div>
                
                
            </div>
                      
        </div>
        
    )
}

export default App
