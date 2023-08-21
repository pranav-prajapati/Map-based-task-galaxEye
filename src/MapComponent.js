import React from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ geojsonData }) => {
  return (
    <MapContainer center={[16.5, 74.5]} zoom={6}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {geojsonData.features.map((feature, index) => (
        <Polygon
          key={index}
          positions={feature.geometry.coordinates[0].map((coord) => [
            coord[1],
            coord[0],
          ])}
          pathOptions={{
            color: "blue",
            fillColor: feature.properties.fill,
            fillOpacity: 0.5,
          }}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
