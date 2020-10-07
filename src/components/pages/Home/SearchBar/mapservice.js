import React, { useEffect } from 'react';
import google from 'google';

let api_key = 'AIzaSyBjf47vw8-reZPcmiv3opmxVgJaFmTpbAE';

function Mapservice() {
  return (
    <>
      <div
        id="map-container"
        style={{ border: '1px solid black', height: '300px', width: '300px' }}
      >
        map goes here
      </div>
    </>
  );
}

export default Mapservice;
