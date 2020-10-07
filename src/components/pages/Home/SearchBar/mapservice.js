import React, { useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

let api_key = 'AIzaSyBjf47vw8-reZPcmiv3opmxVgJaFmTpbAE';

function Mapservice() {
  let map;

  function Map() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 41.4925, lng: 99.9018 }}
      />
    );
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
    <>
      <div
        id="map"
        style={{ border: '1px solid black', height: '600px', width: '600px' }}
      >
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${api_key}`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </>
  );
}

export default Mapservice;
