import React from "react";
import MapComponent from "./MapComponent";
import geojsonData from "./geojsonData.json";
import "./App.css";


function App() {
  return (
    <div className="App">
      <h3 className="heading">GalaxEye Assessment</h3>
      <b>
        <p className="note">
          Note : You can draw the shape on particular region by clicking on polygon icon located at
          top-right corner
        </p>
      </b>
      <MapComponent geojsonData={geojsonData} />
    </div>
  );
}

export default App;
