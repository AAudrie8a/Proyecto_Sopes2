import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {GetCPUUsage} from "../wailsjs/go/sys/Stats";

function App() {
    const [resultText, setResultText] = useState('');
    const [disk, setDisk] = useState('');
    const [disk_free, setDisk_free] = useState('');
    const [disk_total, setDisk_total] = useState('');
    // const [name, setName] = useState('');
    // const updateName = (e) => setName(e.target.value);
    const updateResultText = (result) => {
        setResultText("CPU_Usage: "+result.avg + "%");
        setDisk("Disco Utilizado:"+result.disk+" GB");
        setDisk_free("Disco Libre: "+result.disk_free+" GB");
        setDisk_total("Disco Total: "+result.total_disk+" GB");
    }

    function greet() {
        GetCPUUsage().then(updateResultText);
    }

    setInterval(greet, 1000);
    return (
        <div id="App">
            <div id="result" className="result">{resultText}</div>
            <div id="result" className="result">{disk}</div>
            <div id="result" className="result">{disk_free}</div>
            <div id="result" className="result">{disk_total}</div>
            
        </div>
    )
}

export default App
