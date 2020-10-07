import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IChart, IChartData} from '../chart-interfaces';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReceivingChartDataService {

  constructor(private http: HttpClient) { }

  loadChartData(chartId: number): Observable<IChart> {
    const url = `https://www.ncdc.noaa.gov/cag/regional/time-series/` +
      `${chartId}-tavg-all-12-1895-2016.json?base_prd=true&begbaseyear=1901&endbaseyear=2016`;

    return this.http.get<IChart>(url).pipe(map(
      data => {
        const chartTitle = data["description"].title;
        const tempData: IChartData[] = [];

        for (const [key, value] of Object.entries(data["data"])) {
          tempData.push({date: this.changeDateFormat(key), temperature: this.checkTemperatureType(value["value"])});
        }

        return {id: chartId, title: chartTitle.slice(0, chartTitle.indexOf(',')), data: tempData};
      }
    ));
  }

  changeDateFormat(date: string): string {
    const tempDate = moment(date, 'YYYYMM');
    return tempDate.format('MMM yyyy');
  }

  checkTemperatureType(temperature: any): number {
    if (typeof temperature !== 'number') {
      temperature = +temperature;
    }
    return temperature;
  }
}
