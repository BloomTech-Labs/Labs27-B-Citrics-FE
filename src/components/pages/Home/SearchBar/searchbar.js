import { AutoComplete, Input } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { addMarker } from '../../../../state/actions/searched-cities-actions';
import CityData from '../../../../data/cities';

const { Option } = AutoComplete;

let inputStyles = {
  width: 800,
};

function SearchBar(props) {
  const [valueForm, setValueForm] = useState();
  const dispatch = useDispatch();

  const { ready, setValue, clearSuggestions } = usePlacesAutocomplete({
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
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      const payload = {
        lat,
        lng,
        cityName: results[0].address_components[0].long_name,
        stateName: results[0].address_components[2].long_name,
        address,
      };
      dispatch(addMarker(payload));

      if (props.panToCenter) return props.panToCenter({ lat, lng });
      setValue('', false);
    } catch (error) {
      console.log('😱 Error: ', error);
    }
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
        placeholder="Search for a city..."
        disabled={!ready}
        value={valueForm}
        filterOption={true}
      >
        {FullCityData.map((city, id) => {
          return (
            <Option key={id} value={city}>
              {city}
            </Option>
          );
        })}
      </AutoComplete>
    </div>
  );
}

export default SearchBar;
