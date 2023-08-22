import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import * as turf from "@turf/turf";

const MapComponent = ({ geojsonData }) => {
  const [selectedAOI, setSelectedAOI] = useState(null);
  const [intersectingTiles, setIntersectingTiles] = useState([]);

  const _onCreate = (e) => {
    setSelectedAOI(e.layer.toGeoJSON());
    findIntersectingTiles(e.layer.toGeoJSON());
  };

  const _onDelete = (e) => {
    setSelectedAOI(null);
    setIntersectingTiles([]);
  };

  const findIntersectingTiles = (aoi) => {
    const intersecting = [];
    let tileData = geojsonData.features;

    const aoiPolygon = turf.polygon(aoi.geometry.coordinates);

    for (const tile of tileData) {
      const tilePolygon = turf.polygon(tile.geometry.coordinates);
      if (turf.booleanIntersects(aoiPolygon, tilePolygon)) {
        intersecting.push(tile);
      }
    }

    setIntersectingTiles(intersecting);
  };

  return (
    <MapContainer center={[15, 75]} zoom={6.5}>
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={_onCreate}
          onDeleted={_onDelete}
          draw={{
            rectangle: false,
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polygon: {
              shapeOptions: {
                color: "red",
                fillOpacity: 0.5,
              },
            },
          }}
        />
      </FeatureGroup>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {selectedAOI && (
        <Polygon
          positions={selectedAOI.geometry.coordinates[0].map((coord) => [
            coord[1],
            coord[0],
          ])}
          pathOptions={{
            color: "red",
            fillColor: selectedAOI.properties.fill,
            fillOpacity: 0.2,
          }}
        />
      )}

      {intersectingTiles.map((feature, index) => (
        <Polygon
          key={index}
          positions={feature.geometry.coordinates[0].map((coord) => [
            coord[1],
            coord[0],
          ])}
          pathOptions={{
            color: "blue",
            fillColor: feature.properties.fill,
            fillOpacity: 0.2,
          }}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
