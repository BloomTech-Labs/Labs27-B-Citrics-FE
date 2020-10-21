import React, { useEffect, useState } from 'react';
//component imports
import Footer from './footer';
import SearchBar from './pages/Home/SearchBar/searchbar';
import CityCard from './CityCard';
import MetricCard from './MetricCard';
// antd imports
import { Layout, Card, Button, Row, Col } from 'antd';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CityData from '../data/cities';

const { Header, Sider, Content } = Layout;
//styles
const styles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
};
function Compare(props) {
  const compareList = useSelector(state => state.cityReducer.markers);
  const cities = useSelector(state => state.cityReducer.cityInfo);

  return (
    <>
      <Col>
        <Row
          style={{
            justifyContent: 'space-evenly',
            padding: '40px',
            backgroundColor: 'grey',
          }}
        >
          {cities.map(cities => (
            <CityCard
              wiki_img_url={cities.wiki_img_url}
              name={cities.city}
              statename={cities.statename}
              pop={cities.pop}
              rent={cities.rent}
              household={cities.household}
              website={cities.website}
            />
          ))}
        </Row>
      </Col>
      <Col>
        <Row
          style={{
            justifyContent: 'space-evenly',
            padding: '40px',
            backgroundColor: 'grey',
          }}
        >
          {/* {cities.map(city => ( */}
          <MetricCard
          // name={city.name}
          // pop={city.population}
          // crime={city.crime}
          // rating={city.rating}
          // pass in available metrics through props
          />
          {/* ))} */}
        </Row>
      </Col>
    </>
  );
}
export default Compare;
