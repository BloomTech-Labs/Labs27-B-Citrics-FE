import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { Tabs } from 'antd';

//change widths to look better
const metricCardLayout = {
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  color: '#e8833a',
};

const MetricCard = props => {
  const { TabPane } = Tabs;
  const graphHeight = 'auto';
  const graphWidth = '45%';

  if (!props.data[1]) {
    props.data[1] = {
      city: '',
      house: '',
      home_hist: {},
      income_hist: {},
      individual: '',
      house: '',
      household: '',
      pop: '',
      pop_hist: {},
      density_mi_sq: '',
      rent: '',
      COLI: '',
    };
  }

  if (!props.data[2]) {
    props.data[2] = {
      city: '',
      house: '',
      home_hist: {},
      income_hist: {},
      individual: '',
      house: '',
      household: '',
      pop: '',
      pop_hist: {},
      density_mi_sq: '',
      rent: '',
      COLI: '',
    };
  }

  return (
    <Tabs
      className="search-cities"
      style={metricCardLayout}
      centered="true"
      size="large"
      tabBarGutter="10"
    >
      <TabPane tab="Population Statistics" key="1" style={{ width: '100%' }}>
        <h2>Population Metrics</h2>
        <Plot
          data={[
            {
              y: [props.data[0].pop],
              x: [props.data[0].city],
              type: 'bar',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length > 1 && {
              y: [props.data[1].pop],
              x: [props.data[1].city],
              type: 'bar',
              marker: { color: 'blue' },
              name: props.data[1].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length === 3 && {
              y: [props.data[2].pop],
              x: [props.data[2].city],
              type: 'bar',
              marker: { color: 'green' },
              name: props.data[2].city,
              automargin: true,
              orientation: 'v',
            },
            // { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{
            xaxis: { title: { text: 'City' } },
            yaxis: { tite: { text: 'Population' } },
            title: 'Population Total',
            showlegend: false,
            height: graphHeight,
            width: graphWidth,
          }}
        />
        <Plot
          data={[
            {
              y: Object.values(props.data[0].pop_hist),
              x: Object.keys(props.data[0].pop_hist),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length >= 2 && {
              y: Object.values(props.data[1].pop_hist),
              x: Object.keys(props.data[1].pop_hist),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length === 3 && {
              y: Object.values(props.data[2].pop_hist),
              x: Object.keys(props.data[2].pop_hist),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'green' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
          ]}
          layout={{
            xaxis: { title: { text: 'City' } },
            yaxis: { tite: { text: 'Pop.' } },
            title: 'Population History',
            showlegend: false,
            height: graphHeight,
            width: graphWidth,
          }}
        />
        <Plot
          data={[
            {
              y: [props.data[0].density_mi_sq],
              x: [props.data[0].city],
              type: 'bar',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length >= 2 && {
              y: [props.data[1].density_mi_sq],
              x: [props.data[1].city],
              type: 'bar',
              marker: { color: 'blue' },
              name: props.data[1].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length === 3 && {
              y: [props.data[2].density_mi_sq],
              x: [props.data[2].city],
              type: 'bar',
              marker: { color: 'green' },
              name: props.data[2].city,
              automargin: true,
              orientation: 'v',
            },
            // { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{
            xaxis: { title: { text: 'City' } },
            yaxis: { tite: { text: 'Population' } },
            title: 'Population Density by Square Mile',
            showlegend: false,
            height: graphHeight,
            width: graphWidth,
          }}
        />
      </TabPane>
      <TabPane tab="Income Metrics" key="2" style={{ width: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>Income</h2>
        <Plot
          data={[
            {
              y: [props.data[0].individual],
              x: [props.data[0].city],
              type: 'bar',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length >= 2 && {
              y: [props.data[1].individual],
              x: [props.data[1].city],
              type: 'bar',
              marker: { color: 'blue' },
              name: props.data[1].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length === 3 && {
              y: [props.data[2].individual],
              x: [props.data[2].city],
              type: 'bar',
              marker: { color: 'green' },
              name: props.data[2].city,
              automargin: true,
              orientation: 'v',
            },
            // { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{
            xaxis: { title: { text: 'City' } },
            yaxis: { tite: { text: 'Income in Dollars' } },
            title: 'Income by Individual',
            showlegend: false,
            height: graphHeight,
            width: graphWidth,
          }}
        />
        <Plot
          data={[
            {
              y: [props.data[0].household],
              x: [props.data[0].city],
              type: 'bar',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length >= 2 && {
              y: [props.data[1].household],
              x: [props.data[1].city],
              type: 'bar',
              marker: { color: 'blue' },
              name: props.data[1].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length === 3 && {
              y: [props.data[2].household],
              x: [props.data[2].city],
              type: 'bar',
              marker: { color: 'green' },
              name: props.data[2].city,
              automargin: true,
              orientation: 'v',
            },
            // { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{
            xaxis: { title: { text: 'City' } },
            yaxis: { tite: { text: 'Income in Dollars' } },
            title: 'Income by Household',
            showlegend: false,
            height: graphHeight,
            width: graphWidth,
          }}
        />
        <Plot
          data={[
            {
              y: Object.values(props.data[0].income_hist).filter(
                (element, index) => {
                  return index % 2 === 0;
                }
              ),
              x: Object.keys(props.data[0].income_hist).filter(
                (element, index) => {
                  return index % 2 === 0;
                }
              ),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            {
              y: Object.values(props.data[1].income_hist).filter(
                (element, index) => {
                  return index % 2 === 0;
                }
              ),
              x: Object.keys(props.data[1].income_hist).filter(
                (element, index) => {
                  return index % 2 === 0;
                }
              ),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
              name: props.data[1].city,
              automargin: true,
              orientation: 'v',
            },
            {
              y: Object.values(props.data[2].income_hist).filter(
                (element, index) => {
                  return index % 2 === 0;
                }
              ),
              x: Object.keys(props.data[2].income_hist).filter(
                (element, index) => {
                  return index % 2 === 0;
                }
              ),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'green' },
              name: props.data[2].city,
              automargin: true,
              orientation: 'v',
            },
          ]}
          layout={{
            xaxis: { title: { text: 'City' } },
            yaxis: { tite: { text: 'Price in Dollars' } },
            title: 'Income History',
            showlegend: false,
            height: graphHeight,
            width: graphWidth,
          }}
        />
      </TabPane>
      <TabPane tab="Living Costs" key="3" style={{ width: '100%' }}>
        <Plot
          data={[
            {
              y: [props.data[0].house],
              x: [props.data[0].city],
              type: 'bar',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length >= 2 && {
              y: [props.data[1].house],
              x: [props.data[1].city],
              type: 'bar',
              marker: { color: 'blue' },
              name: props.data[1].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length === 3 && {
              y: [props.data[2].house],
              x: [props.data[2].city],
              type: 'bar',
              marker: { color: 'green' },
              name: props.data[2].city,
              automargin: true,
              orientation: 'v',
            },
          ]}
          layout={{
            xaxis: { title: { text: 'City' } },
            yaxis: { tite: { text: '$' } },
            title: 'Average House Pricing',
            showlegend: false,
            height: graphHeight,
            width: graphWidth,
          }}
        />
        <Plot
          data={[
            {
              y: Object.values(props.data[0].home_hist),
              x: Object.keys(props.data[0].home_hist),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            {
              y: Object.values(props.data[1].home_hist),
              x: Object.keys(props.data[1].home_hist),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
              name: props.data[1].city,
              automargin: true,
              orientation: 'v',
            },
            {
              y: Object.values(props.data[2].home_hist),
              x: Object.keys(props.data[2].home_hist),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'green' },
              name: props.data[2].city,
              automargin: true,
              orientation: 'v',
            },
          ]}
          layout={{
            xaxis: { title: { text: 'City' } },
            yaxis: { tite: { text: 'Price in Dollars' } },
            title: 'House Price History',
            showlegend: false,
            height: graphHeight,
            width: graphWidth,
          }}
        />
        <Plot
          data={[
            {
              y: [props.data[0].COLI],
              x: [props.data[0].city],
              type: 'bar',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length >= 2 && {
              y: [props.data[1].COLI],
              x: [props.data[1].city],
              type: 'bar',
              marker: { color: 'blue' },
              name: props.data[1].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length === 3 && {
              y: [props.data[2].COLI],
              x: [props.data[2].city],
              type: 'bar',
              marker: { color: 'green' },
              name: props.data[2].city,
              automargin: true,
              orientation: 'v',
            },
            // { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{
            xaxis: { title: { text: 'City' } },
            yaxis: { tite: { text: '%' } },
            title: 'Cost of Living Index',
            showlegend: false,
            height: graphHeight,
            width: graphWidth,
          }}
        />
        <Plot
          data={[
            {
              y: [props.data[0].rent],
              x: [props.data[0].city],
              type: 'bar',
              mode: 'lines+markers',
              marker: { color: 'red' },
              name: props.data[0].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length >= 2 && {
              y: [props.data[1].rent],
              x: [props.data[1].city],
              type: 'bar',
              marker: { color: 'blue' },
              name: props.data[1].city,
              automargin: true,
              orientation: 'v',
            },
            props.data.length === 3 && {
              y: [props.data[2].rent],
              x: [props.data[2].city],
              type: 'bar',
              marker: { color: 'green' },
              name: props.data[2].city,
              automargin: true,
              orientation: 'v',
            },
            // { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{
            xaxis: { title: { text: 'City' } },
            yaxis: { tite: { text: '$' } },
            title: 'Rent',
            showlegend: false,
            height: graphHeight,
            width: graphWidth,
          }}
        />
        )
      </TabPane>
    </Tabs>
  );
};
export default MetricCard;
