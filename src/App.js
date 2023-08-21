import React from 'react';
import MapComponent from './MapComponent'; 
import geojsonData from './geojsonData.json'; 
import "./App.css";


function App() {
  return (
    <div className="App">
      <MapComponent geojsonData={geojsonData} />
    </div>
  );
}

export default App;
