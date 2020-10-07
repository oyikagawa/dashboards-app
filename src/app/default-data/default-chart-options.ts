import {defaultColors} from './default-colors';

export const defaultChartOptions = {
  chart: {
    type: 'spline',
    height: 450,
  },
  title: {
    text: 'Average temperatures'
  },
  credits: {
    enabled: false
  },
  xAxis: {
    type: 'datetime',
    categories: []
  },
  yAxis: {
    title: {
      text: 'Temperature °F'
    }
  },
  series: []
};
