import { Injectable } from '@angular/core';
import {ChartService} from './chart.service';
import {ReceivingChartDataService} from './receiving-chart-data.service';
import {ChartsDataCashService} from './charts-data-cash.service';
import {defaultChartsWoDataArray} from '../default-data/default-charts-wo-data-array';
import {IChart, IChartState, IChartWoData} from '../chart-interfaces';
import {Observable} from 'rxjs';
import {defaultChartOptions} from '../default-data/default-chart-options';


@Injectable({
  providedIn: 'root'
})
export class ExtendedChartService extends ChartService{

  chartsToAddArray: IChartWoData[] = [];
  curAddedCharts: IChartState[] = [];

  constructor(public receiveService: ReceivingChartDataService,
              public cashService: ChartsDataCashService) {
    super(receiveService, cashService);
  }

  loadAllCharts(): Observable<IChart>[] {
    const chartsArrayTemp$: Observable<IChart>[] = [];
    defaultChartsWoDataArray.forEach(val => chartsArrayTemp$.push(this.receiveService.loadChartData(val.id)));
    return chartsArrayTemp$;
  }

  getChartsToAdd(id: number): void {
    this.chartsToAddArray = defaultChartsWoDataArray.filter(filter => filter.id !== id);
  }

  addToCurAddedCharts(chartId: number): void {
    const idxTemp = defaultChartsWoDataArray.findIndex(val => val.id === chartId);

    const chartTemp = {id: defaultChartsWoDataArray[idxTemp].id, title: defaultChartsWoDataArray[idxTemp].title,
      checked: false, color: this.colors[idxTemp]};

    this.curAddedCharts.push(chartTemp);
  }

  toggleChartsInSeries(chart: IChartWoData, startDate: string, endDate: string): any | number {
    let temp: any;

    let chartIdx = this.curAddedCharts.findIndex(val => val.id === chart.id);
    const colorIdx = defaultChartsWoDataArray.findIndex(val => val.id === chart.id);
    if (chartIdx === -1) {
      chartIdx = this.curAddedCharts
        .push({id: chart.id, title: chart.title, checked: true, color: this.colors[colorIdx]}) - 1;
    }

    this.curAddedCharts[chartIdx].checked = !this.curAddedCharts[chartIdx].checked;

    if (!this.curAddedCharts[chartIdx].checked) {
      const chartTemp = this.getChart(chart.id, startDate, endDate);
      temp = chartTemp.series[0];
    } else {
      this.curAddedCharts.splice(chartIdx, 1);
      temp = chartIdx;
    }
    return temp;
  }

  toggleChartData(startDate: string, endDate: string): any {
    const chartOptionsTemp = defaultChartOptions;
    const series: any = [];
    this.curAddedCharts.forEach(
      (chart, idx) => {
        series.push(this.getChart(chart.id, startDate, endDate).series[0]);
      }
    );
    chartOptionsTemp.series = series;
    return chartOptionsTemp;
  }
}
