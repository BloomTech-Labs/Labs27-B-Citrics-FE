import { AutoComplete, Input } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
const { Option } = AutoComplete;

let inputStyles = {
  width: 600,
};

function SearchBar(props) {
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
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      props.panToCenter({ lat, lng });
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  };

  const onChangeHandler = e => {
    setValue(e.target.value, true);
  };

  return (
    <div className="search-bar">
      <AutoComplete
        style={inputStyles}
        onSelect={onSelectHandler} /*disabled={!ready}*/
      >
        {status === 'OK' &&
          data.map(({ id, description }) => (
            <Option key={id} value={description}>
              {description}
            </Option>
          ))}

        <Input.Search
          size="large"
          value={value}
          // enterbutton
          placeholder="Search for a city..."
          onChange={onChangeHandler}
        />
      </AutoComplete>
    </div>
  );
}

export default SearchBar;
