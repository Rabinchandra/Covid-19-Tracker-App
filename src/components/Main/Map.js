import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../style/map.css';

function Map({ selectedType, countriesInfo, colors }) {
  const extraRadius = 5;

  return (
    <div id='main__map'>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={4}
        minZoom={3}
        maxZoom={5}
        style={mapStyle}
        scrollWheelZoom={false}>
        <TileLayer url='https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=dBTQT86fZ9yGbJ9NrdnP' />
        {countriesInfo.map((countryInfo, index) => {
          let radius =
            parseInt(
              (countryInfo[selectedType] / countriesInfo[0][selectedType]) * 100
            ) + extraRadius;

          radius = radius > 100 + extraRadius ? 0 : radius;

          return (
            <CircleMarker
              center={[countryInfo.lat, countryInfo.long]}
              radius={isNaN(radius) ? 0 : radius}
              pathOptions={{
                color: colors[selectedType],
              }}
              key={`country-map-circle-${index}`}>
              <Popup>
                <h2>{countryInfo.country}</h2>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}

const mapStyle = {
  width: '100%',
  height: '400px',
};

export default Map;
