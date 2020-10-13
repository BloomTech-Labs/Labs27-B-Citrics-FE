import React, { useState } from 'react';
import mapStyles from './mapStyles';
import SearchBar from './searchbar';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

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

// COMPONENT
const MapService = props => {
  // REDUX STATE
  const markers = useSelector(state => state.cityReducer.markers);

  const [selected, setSelected] = useState(null);

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
      <div className="search-bar-container" style={{ width: '100%' }}>
        <SearchBar panToCenter={panTo} width={800} />
      </div>
      <div id="map">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={5}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {markers.map(marker => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={e => setSelected(marker)}
              icon={{
                // Need to tweak the URL to get pointer.svg to work, this one is temporary
                url: `https://www.flaticon.com/svg/static/icons/svg/1181/1181732.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="pointer-info">
                <h2>{selected.cityName ? selected.cityName : 'Error'}</h2>
                <Button type="primary" size="large">
                  Add to Comparison
                </Button>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
};

export default MapService;
