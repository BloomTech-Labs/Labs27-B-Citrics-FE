import React, { useState } from 'react';

//component imports
import Footer from './footer';
import SearchBar from './pages/Home/SearchBar/searchbar';

// antd imports
import { Layout, Card, Button } from 'antd';
const { Header, Sider, Content } = Layout;

//styles
const topSearch = {
  display: 'flex',
  //flexDirection: 'row',
  alignItems: 'flex-end',
};
const styles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
};
const searchCard = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  width: 600,
};
function Compare(props) {
  const [cities, setCities] = useState();

  return (
    <>
      <div className="top-search" style={topSearch}>
        <SearchBar width={'60%'} />
        <Button> Find on Map </Button>
      </div>

      <div className="search-cities" style={searchCard}>
        <Card title="Search Cities" bordered={false} style={{ width: 300 }}>
          <a>MAP </a>
          <p>City Name</p>
          <p>Overall Rating</p>
          <p>Crime</p>
          <p>Cost of Living</p>
          <p>Population</p>
        </Card>

        <div className="profile-side" style={styles}>
          <Card title="Comparsion" style={{ width: 300 }}>
            <h3>profile link</h3>
            <p>First Name</p>
            <p>Last Name</p>
            <p>Location</p>
          </Card>
          <Card title="Preferred Stats" style={{ width: 300 }}>
            <p>Stats</p>
            <p>Stats</p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Compare;
