import { Injectable } from '@angular/core';
import {ReceivingChartDataService} from './receiving-chart-data.service';
import {ChartsDataCashService} from './charts-data-cash.service';
import {IChart} from '../chart-interfaces';
import {defaultColors} from '../default-data/default-colors';
import {defaultChartOptions} from '../default-data/default-chart-options';
import {defaultChartsWoDataArray} from '../default-data/default-charts-wo-data-array';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  colors = defaultColors;

  constructor(public receiveService: ReceivingChartDataService,
              public cashService: ChartsDataCashService) { }

  addChart(chart: IChart): void {
    this.cashService.addChartToCash(chart);
  }

  getChart(id: number, startDate: string = 'Jan 1895', endDate: string = 'Dec 2016'): any {
    let chart: any;

    switch (this.cashService.checkChartCashAvailable(id)){
      case 'object': {
        const chartTemp = this.cashService.getChartCashRange(id, startDate, endDate);
        chart = this.tuneChart(chartTemp);
        break;
      }
      case 'undefined': {
        chart = this.receiveService.loadChartData(id);
        break;
      }
    }
    return chart;
  }

  instanceOfChartOptions(data: any): boolean {
    return 'chart' in data;
  }

  tuneChart(chart: IChart): any {
    const chartOptionsTemp = defaultChartOptions;

    chartOptionsTemp.series = [];
    chartOptionsTemp.xAxis.categories = [];

    const series = {name: chart.title, turboThreshold: chart.data.length, data: [], color: this.updateColors(chart.id)};

    chart.data.forEach(chartData => {
      series.data.push(chartData.temperature);
      chartOptionsTemp.xAxis.categories.push(chartData.date);
    });
    chartOptionsTemp.series.push(series);

    return chartOptionsTemp;
  }

  updateColors(chartId: number, color?: string): string | void {
    const idxTemp = defaultChartsWoDataArray.findIndex(val => val.id === chartId);
    if (color) {
      this.colors[idxTemp] = color;
    } else {
      return this.colors[idxTemp];
    }
  }
}
