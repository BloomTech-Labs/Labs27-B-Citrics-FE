import { AutoComplete, Input } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { addMarker } from '../../../../state/actions/searched-cities-actions';
import { getCityMetrics } from '../../../../state/actions/userActions';
import CityData from '../../../../data/cities';
import { useState } from 'react';
import axios from 'axios';

const { Option } = AutoComplete;

let inputStyles = {
  width: 800,
};

function SearchBar(props) {
  const dispatch = useDispatch();
  const compareList = useSelector(state => state.cityReducer.markers);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' },
    },
  });

  if (props.width) {
    inputStyles = { ...inputStyles, width: props.width };
  }

  const onSelectHandler = async address => {
    setValue(address, false);
    clearSuggestions();

    try {
      console.log('selected');
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(results[0].address_components[2].long_name);
      const payload = {
        lat,
        lng,
        cityName: results[0].address_components[0].long_name,
        stateName: results[0].address_components[2].long_name,
      };
      console.log(payload.stateName);
      dispatch(addMarker(payload));

      if (props.panToCenter) return props.panToCenter({ lat, lng });
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  };

  const onChangeHandler = e => {
    setValue(e.target.value, true);
  };

  let FullCityData = [];
  let Cities = Object.keys(CityData);
  for (let i = 0; i < Cities.length; i++) {
    FullCityData.push(Cities[i]);
  }

  return (
    <div className="search-bar">
      <AutoComplete
        style={inputStyles}
        onSelect={onSelectHandler}
        disabled={!ready}
        filterOption={true}
      >
        {FullCityData.map((city, id) => {
          return (
            <Option key={id} value={city}>
              {city}
            </Option>
          );
        })}

        <Input.Search
          size="large"
          value={value}
          placeholder="Search for a city..."
          onChange={onChangeHandler}
        />
      </AutoComplete>
    </div>
  );
}

export default SearchBar;
