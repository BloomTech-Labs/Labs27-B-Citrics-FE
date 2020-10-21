export const barGraph = (props, title, xLabel, yLabel) => {
  let trace2, trace3;

  let trace1 = {
    automargin: true,
    x: props.data[0].plotX,
    y: props.data[0].plotY,
    type: 'bar',
    name: props.data[0].name,
    marker: {
      color: 'rgb(49,130,189)',
      opacity: 0.7,
    },
    orientation: props.data[0].orientation ?? 'v',
  };
  if (props.data[1]) {
    trace2 = {
      automargin: true,
      x: props.data[1].plotX,
      y: props.data[1].plotY,
      type: 'bar',
      name: props.data[1].name,
      marker: {
        color: 'rgb(247, 77, 77,.5)',
        opacity: 0.5,
      },
      orientation: props.data[0].orientation ?? 'v',
    };
  }
  if (props.data[2]) {
    trace3 = {
      automargin: true,
      x: props.data[2].plotX,
      y: props.data[2].plotY,
      type: 'bar',
      name: props.data[2].name,
      marker: {
        color: 'rgb(158,202,225)',
        opacity: 0.5,
      },
      orientation: props.data[0].orientation ?? 'v',
    };
  }
  let dataPlot = [
    trace1,
    props.data[1] ? trace2 : {},
    props.data[2] ? trace3 : {},
  ];

  let layout = {
    title: title ?? '',
    autosize: true,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: {
      size: 12,
      color: '#000',
    },
    showlegend: true,
    barmode: props.mode ? props.mode : 'group',
    xaxis: {
      title: {
        text: xLabel ?? '',
      },
    },
    yaxis: {
      title: {
        text: yLabel ?? '',
      },
    },
  };

  return { dataPlot, layout };
};
