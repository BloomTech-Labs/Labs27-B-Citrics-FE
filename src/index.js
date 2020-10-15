import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  Link,
} from 'react-router-dom';
import { Security, LoginCallback /*SecureRoute*/ } from '@okta/okta-react';

import 'antd/dist/antd.less';
import { Card, Drawer, Layout } from 'antd';

import './components/FontAwesomeIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// REDUX
import reducers from './state/reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-thunk';

// ACTIONS
import { openDrawer, closeDrawer } from './state/actions/userActions';

// COMPONENTS
import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import { HomePage } from './components/pages/Home';
import { ExampleDataViz } from './components/pages/ExampleDataViz';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import MapService from './components/pages/Home/SearchBar/mapservice';
import SearchBar from './components/pages/Home/SearchBar/searchbar';
import FooterContents from './components/footer';

import Compare from './components/comparePage';

import Profile from './components/pages/Home/Profile';
import Compare from './components/comparePage';
const { Header, Footer } = Layout;

const store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const drawer_open = useSelector(state => state.userReducer.profileIsOpen);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Header
        style={{
          background: '#B3B5B8',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Link to="/map">
          <FontAwesomeIcon icon={['fas', 'search']}></FontAwesomeIcon>
          Search
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={['fas', 'chart-area']}></FontAwesomeIcon>
          Trending
        </Link>
        <button
          className="button-link"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <FontAwesomeIcon icon={['fas', 'user-circle']}></FontAwesomeIcon>
          Profile
        </button>
      </Header>
      <Drawer
        title="Profile"
        placement="right"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Profile />
      </Drawer>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <Route path="/" exact component={HomePage} />
        <Route path="/map" component={MapService} />
        <Route path="/search" component={SearchBar} />
        <Route path="/compare" component={Compare} />
      </Switch>
      <Footer
        style={{
          background: '#778899',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.5em',
          position: 'relative',
          bottom: '0',
          width: '100%',
        }}
      >
        <FooterContents />
      </Footer>
    </Security>
  );
}
