import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import SearchBar from './SearchBar/searchbar';
// Ant Design Imports
import 'antd/dist/antd.css';
import { Layout, Input, Button } from 'antd';

// Home Page CSS
import '../../../styles/home.css';

import RenderHomePage from './RenderHomePage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomeContainer(props) {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  // Ant Design Components
  const { Sider, Content } = Layout;

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

  return (
    <>
      <div className="search-container">
        <SearchBar width={'100%'} />
        <Button className="find-on-map">
          Find On Map{' '}
          <FontAwesomeIcon
            className="find-on-map-i"
            icon={['fas', 'compass']}
          ></FontAwesomeIcon>
        </Button>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps, {})(HomeContainer);
