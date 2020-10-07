import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';

// Ant Design Imports
import 'antd/dist/antd.css';
import { Layout, Input, Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

import RenderHomePage from './RenderHomePage';

function HomeContainer({ LoadingComponent }) {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  // Ant Design Components
  const { Header, Footer, Sider, Content } = Layout;
  const { Search } = Input;

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
      <Layout style={{ height: '80%' }}>
        <Header
          style={{
            background: '#C3CFD9',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <a style={{ padding: '5px' }}>Search</a>
          <a style={{ padding: '5px' }}>Trending</a>
          <a style={{ padding: '5px' }}>Profile</a>
        </Header>
        <Layout>
          <Content
            style={{ background: 'white', margin: '15%', height: '70%' }}
          >
            <Search
              placeholder="Search for a city"
              enterButton="Search"
              size="large"
              onSearch={value => console.log(value)}
            />
            {/* <Button type="primary">Find On Map</Button> */}
          </Content>
          <Sider style={{ background: '#C3CFD9' }}></Sider>
        </Layout>
        <Footer
          style={{
            background: '#C3CFD9',
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: '1.5em',
          }}
        >
          <h2>Citrics</h2>
        </Footer>
      </Layout>
    </>
  );
}

export default HomeContainer;
