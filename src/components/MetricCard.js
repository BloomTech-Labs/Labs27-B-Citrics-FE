import React from 'react';
import { Card } from 'antd';
import DataVisualization from './DataVisualization';

const MetricCard = props => {
  //change widths to look better
  const metricCardLayout = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 600,
  };
  return (
    <>
      <div className="search-cities" style={metricCardLayout}>
        <Card
          bordered={true}
          style={{ width: 600, display: 'flex', justifyContent: 'center' }}
        >
          {/* <p>{props.name}</p>
          <p>{props.rating}</p>
          <p>{props.crime}</p>
          <p>{props.pop}</p> */}
          <DataVisualization></DataVisualization>
          {/* 
            -City name
            -population
            -maps
            -Real Estate
            -homes
            -Relocation
            -Travel
            -Jobs
            -Hospitals
            -Schools
            -Crime
            -Moving
            -Houses
            */}
        </Card>
      </div>
    </>
  );
};
export default MetricCard;
