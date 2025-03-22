import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { SiEagle } from "react-icons/si";
import './App.css';
import RajasthanMap from './components/map/Map';

function App() {

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Map of Rajasthan</h1>

      <div>
        <RajasthanMap />
      </div>
      <div style={{ paddingLeft: '10%',display: 'flex', justifyContent: 'space-between' }}>
        <div>
        <h2>Instructions:</h2>
          <p style={{ fontSize: '20px' }}><FaLocationDot />
            Click on the markers to view the details.</p>
          <p style={{ fontSize: '20px' }}><SiEagle />
          Click on the polygons to view the details.</p>
        </div>
        <div>
          <button>Refresh</button>
        </div> 
      </div>
    </>
  )
}

export default App
