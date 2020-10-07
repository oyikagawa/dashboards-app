import { Injectable } from '@angular/core';
import {defaultDashboardsHandset, defaultDashboardsWeb} from '../default-data/default-dashboard-view-type';
import {defaultChartsWoDataArray} from '../default-data/default-charts-wo-data-array';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  private dashboardsHandsetView: {id: number, cols: number, rows: number}[];
  private dashboardsWebView: {id: number, cols: number, rows: number}[];

  constructor() {
    this.changeAmountOfDashboards(defaultChartsWoDataArray.length);
  }

  changeAmountOfDashboards(chartsAmount: number): void {
    this.dashboardsHandsetView = defaultDashboardsHandset.slice(0, chartsAmount);
    this.dashboardsWebView = defaultDashboardsWeb.slice(0, chartsAmount);
    for (let i = 0; i < chartsAmount; i++) {
      this.dashboardsHandsetView[i].id = defaultChartsWoDataArray[i].id;
      this.dashboardsWebView[i].id = defaultChartsWoDataArray[i].id;
    }
  }

  toggleDashboardsView(handset: boolean): {id: number, cols: number, rows: number}[] {
    return handset ? this.dashboardsHandsetView : this.dashboardsWebView;
  }
}
