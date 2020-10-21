import React, { useState } from 'react';

import { Layout, Card } from 'antd';

const searchCard = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  width: 300,
};

const CityCard = props => {
  return (
    <>
      <div className="search-cities" style={searchCard}>
        <Card bordered={true} style={{ width: 300 }}>
          <p>{props.name}</p>
          <p>{props.pop}</p>
          <p>{props.rent}</p>
          <p>{props.website}</p>
        </Card>
      </div>
    </>
  );
};

export default CityCard;
