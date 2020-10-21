import React, { useEffect, useState } from 'react';
import mapStyles from './mapStyles';
import SearchBar from './searchbar';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Drawer } from 'antd';
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CitySelect from './CitySelect';
import { useHistory } from 'react-router-dom';
import {
  RemoveFirstMarker,
  RemoveAlerts,
} from '../../../../state/actions/searched-cities-actions';

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
  const alert = useSelector(state => state.cityReducer.alert);
  const dispatch = useDispatch();

  const history = useHistory();

  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  // Manage Compare List Length
  if (markers.length > 3) {
    dispatch(RemoveFirstMarker());
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // UseEffect to check if a new search has been made
  useEffect(() => {
    setSelected(markers[markers.length - 1]);
  }, [markers]);

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading...';

  console.log(alert);

  return (
    <>
      <div className="search-bar-container" style={{ width: '100%' }}>
        <SearchBar panToCenter={panTo} width={800} />
      </div>
      {alert ? (
        <div className="alert-warn">
          <Alert
            type="warning"
            message="Please only select 3 cities"
            closable={true}
            showIcon={true}
            onClose={() => dispatch(RemoveAlerts())}
          />
        </div>
      ) : null}
      <div id="map">
        <Button
          onClick={() => setVisible(!visible)}
          className="btn open-drawer"
        >
          <FontAwesomeIcon icon={['fas', 'list-ul']}></FontAwesomeIcon>
        </Button>
        <Drawer
          width={500}
          mask={false}
          placement="left"
          closable={true}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <CitySelect
            list={markers}
            selected={selected}
            setSelected={setSelected}
          />
        </Drawer>
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
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
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
              position={{
                lat: selected.lat,
                lng: selected.lng,
              }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="pointer-info">
                <h2>{selected.cityName ? selected.cityName : 'Error'}</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Debitis repellendus recusandae nisi voluptatem non accusantium
                  esse dolorem consequatur qui molestiae. teastesataewsta
                </p>
                <Button
                  onClick={() => {
                    markers.length > 1
                      ? history.push('/compare')
                      : setVisible(true);
                  }}
                  className="btn"
                  type="primary"
                  size="large"
                >
                  {markers.length > 1 ? 'Compare' : 'View'}
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
