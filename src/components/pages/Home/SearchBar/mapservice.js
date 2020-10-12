import React, { useState } from 'react';
import mapStyles from './mapStyles';
import SearchBar from './searchbar';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  // InfoWindow,
} from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
  width: '99vw',
  height: '90vh',
};

const center = {
  lat: 39.106667,
  lng: -94.676392,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const MapService = props => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading...';

  return (
    <>
      <div className="search-bar-container">
        <SearchBar panToCenter={panTo} />
      </div>
      <div id="map">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={5}
          center={center}
          options={options}
          onLoad={onMapLoad}
        ></GoogleMap>
      </div>
    </>
  );
};

export default MapService;
