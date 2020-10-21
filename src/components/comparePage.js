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
  const [cities, setCities] = useState([]);

  const CityId = compareList.map(city => {
    let fullName = `${city.cityName}, ${city.stateName}`;
    return CityData[fullName];
  });
  useEffect(() => {
    let first = `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[0]}`;

    let second = `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[1]}`;

    let third = `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[2]}`;

    if (CityId.length === 3) {
      console.log('yo');
      axios
        .all([axios.get(first), axios.get(second), axios.get(third)])
        .then(
          axios.spread((first, second, third) => {
            console.log(first.data, second.data, third.data);
            setCities([first.data, second.data, third.data]);
          })
        )
        .catch(err => console.log(err));
    } else {
      axios
        .all([axios.get(first), axios.get(second)])
        .then(
          axios.spread((first, second) => {
            console.log(first.data, second.data);
            setCities([first.data, second.data]);
          })
        )
        .catch(err => console.log(err));
    }
  }, []);

  console.log(cities);
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
              name={cities.city}
              pop={cities.pop}
              rent={cities.rent}
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
          {cities.length !== 0 && <MetricCard data={cities} />}
        </Row>
      </Col>
    </>
  );
}
export default Compare;
