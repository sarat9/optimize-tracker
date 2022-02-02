import logo from './logo.svg';
import './App.css';
import Optimizer from './components/Optimizer'
import HeatMap from './components/HeatMap';
import ScrollMap from './components/ScrollMap';
import { useState } from 'react';

function App() {
  const [isHeatMapOn, setIsHeatMapOn] = useState(true)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click <code>Anywhere</code> to generate heatmap on your clicks.
        </p>
        <p>
          Saving your mouse event click data in your local storage. To start fresh clear the local storage.
        </p>
        <span style={{fontSize: '12px'}}>After click, wait for 5 seconds and then refresh to apear the heatmap on the screen</span>
        <Optimizer />
        {isHeatMapOn&&<HeatMap />}
        {false&&<HeatMap />}
      </header>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
}

export default App;
