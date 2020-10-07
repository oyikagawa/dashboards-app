import {Injectable} from '@angular/core';
import {IChart} from '../chart-interfaces';
import {defaultColors} from '../default-data/default-colors';

@Injectable({
  providedIn: 'root'
})
export class ChartsDataCashService {

  private readonly chartsDataCash: IChart[] = [];

  constructor() { }

  addChartToCash(chart: IChart): void {
    this.chartsDataCash.push(chart);
  }

  getChartCashRange(chartId: number, startDate: string, endDate: string): IChart {
    const startIdx = this.chartsDataCash.find(val => val.id === chartId).data.findIndex(val => val.date === startDate);
    const endIdx = this.chartsDataCash.find(val => val.id === chartId).data.findIndex(val => val.date === endDate);

    return {
      id: chartId,
      title: this.chartsDataCash.find(val => val.id === chartId).title,
      data: this.chartsDataCash.find(val => val.id === chartId).data.slice(startIdx, endIdx + 1)
    };
  }

  checkChartCashAvailable(id: number): string {
    return typeof this.chartsDataCash.find(val => val.id === id);
  }
}
