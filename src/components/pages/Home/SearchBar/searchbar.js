import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const mockVal = (str, repeat = 1) => {
  return {
    value: str.repeat(repeat),
  };
};

// Replace mockVal with the eventual city lookup database
function SearchBar() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = searchText => {
    setOptions(
      !searchText
        ? []
        : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
    );
  };

  const onSelect = data => {
    console.log('onSelect', data);
  };

  const onChange = data => {
    setValue(data);
  };

  return (
    <div className="search-bar">
      <AutoComplete
        options={options}
        style={{
          width: 600,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="Begin Typing your Search Here"
      />
      <img
        style={{ width: '30px', height: '30px' }}
        src="https://img.icons8.com/ios-filled/50/000000/map-marker.png"
      />
    </div>
  );
}

export default SearchBar;
