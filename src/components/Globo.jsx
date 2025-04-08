// src/components/Globo.jsx
import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import "./Globo.css";

function Globo({ cityCoords, onCountryClick }) {
  const globeEl = useRef();
  const [countries, setCountries] = useState([]);

  const geoUrl =
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

  // Cargar los países desde el GeoJSON
  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((data) => setCountries(data.features))
      .catch((err) => console.error("Error cargando países", err));
  }, []);

  // Enfocar el globo en la ciudad buscada
  useEffect(() => {
    if (cityCoords && globeEl.current) {
      globeEl.current.pointOfView(
        {
          lat: cityCoords.lat,
          lng: cityCoords.lng,
          altitude: 1.5,
        },
        1500
      );
    }
  }, [cityCoords]);

  return (
    <div className="globe-container">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"
        polygonsData={countries}
        polygonCapColor={() => "rgba(0, 255, 0, 0.2)"}
        polygonSideColor={() => "rgba(0, 100, 0, 0.05)"}
        polygonStrokeColor={() => "#444"}
        onPolygonClick={(polygon) => {
          const nombre = polygon.properties?.name;
          if (nombre) {
            alert(`País: ${nombre}`);
            if (onCountryClick) onCountryClick(nombre);
          }
        }}
        polygonsTransitionDuration={300}
      />
    </div>
  );
}

export default Globo;
