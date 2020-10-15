import React, { useState } from 'react';

//component imports
import Footer from './footer';
import SearchBar from './pages/Home/SearchBar/searchbar';
import CityCard from './CityCard';

// antd imports
import { Layout, Card, Button } from 'antd';
const { Header, Sider, Content } = Layout;

//styles

const styles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
};

function Compare(props) {
  const [cities, setCities] = useState();

  const cityInfo = [
    { cityId: 0, name: 'Nola', population: 324235, crime: 500, rating: 3 },
    { cityId: 1, name: 'Orlando', population: 324235, crime: 500, rating: 3 },
    { cityId: 2, name: 'Memphis', population: 324235, crime: 500, rating: 3 },
    {
      cityId: 3,
      name: 'Baton Rouge',
      population: 324235,
      crime: 500,
      rating: 3,
    },
    { cityId: 4, name: 'New York', population: 324235, crime: 500, rating: 3 },
    { cityId: 5, name: 'Mobile', population: 324235, crime: 500, rating: 3 },
  ];

  return (
    <>
      {cityInfo.map(city => (
        <CityCard
          name={city.name}
          pop={city.population}
          crime={city.crime}
          rating={city.rating}
        />
      ))}
    </>
  );
}

export default Compare;
