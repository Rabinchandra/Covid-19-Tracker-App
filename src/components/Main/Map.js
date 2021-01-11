import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import numeral from 'numeral';

function Map({ selectedType, countriesInfo, colors, selectedCountry }) {
  const extraRadius = 5;

  return (
    <div id='main__map'>
      <MapContainer
        center={[51, 10]}
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
                {/* Flag */}
                <img src={countryInfo.flag} alt='' style={flagStyle} />
                {/* Country name */}
                <h2>{countryInfo.country}</h2>
                <p style={{ fontSize: '1.3em', lineHeight: '1.5em' }}>
                  {/* Confirmed cases */}
                  <strong>Confirmed: </strong>
                  {numeral(countryInfo.confirmed).format('0.0a').toUpperCase()}
                  <br />
                  {/* Active Cases */}
                  <strong>Active: </strong>
                  {numeral(countryInfo.active)
                    .format('0.0a')
                    .toUpperCase()}{' '}
                  <br />
                  {/* Recovered */}
                  <strong>Recovered: </strong>
                  {numeral(countryInfo.recovered).format('0.0a').toUpperCase()}
                  <br />
                  {/* Deaths cases */}
                  <strong>Deaths: </strong>
                  {numeral(countryInfo.deaths).format('0.0a').toUpperCase()}
                </p>
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
  height: '500px',
  // borderRadius: '12px',
};

const flagStyle = {
  objectFit: 'contain',
  width: '100%',
};

export default Map;
