import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import SearchBar from './SearchBar/searchbar';
import Mapservice from './SearchBar/mapservice';
import { connect } from 'react-redux';

import RenderHomePage from './RenderHomePage';

function HomeContainer(props) {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => console.log(props), []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  const [mapOn, setMapOn] = useState(false);

  return (
    <>
      <h1>HomePage</h1>
      <SearchBar />
      {!mapOn && (
        <button
          onClick={e => {
            e.stopPropagation();
            setMapOn(true);
          }}
          id="map-toggle"
        >
          Find on Map
        </button>
      )}
      {mapOn && <Mapservice />}
    </>
  );
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps, {})(HomeContainer);
