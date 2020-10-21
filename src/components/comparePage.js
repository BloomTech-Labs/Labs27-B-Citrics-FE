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
    async function fetchData() {
      let getCity = await axios
        .get(
          `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[0]}`
        )
        .then(res => {
          console.log(res.data);
          setCities([...cities, res.data]);
          console.log('1', cities);
          return axios.get(
            `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[1]}`
          );
        })
        .then(res => {
          setCities([...cities, res.data]);
          console.log('2', cities);
          if (compareList.length === 3) {
            return axios.get(
              `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[2]}`
            );
          }
        })
        .catch(err => {
          console.log(err);
        });

      return;
    }
    fetchData();
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
          {/* {cities.map(cities => ( */}
          <CityCard
            name={cities.city}
            pop={cities.pop}
            rent={cities.rent}
            website={cities.website}
          />
          {/* ))} */}
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
