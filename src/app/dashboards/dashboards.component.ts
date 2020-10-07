import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {DashboardsService} from '../services/dashboards.service';
import {DateAndChartTypeBase, datePickerProviders} from '../base-functionality/date-and-chart-type-base';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css'],
  providers: [datePickerProviders,
    DashboardsService]
})
export class DashboardsComponent extends DateAndChartTypeBase implements OnInit{

  dashboards: {id: number, cols: number, rows: number}[] = [];
  chartsAmount = 4;
  isHandSet: boolean;

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => matches));

  constructor(private breakpointObserver: BreakpointObserver,
              private dashboardsService: DashboardsService) {
    super();
  }

  ngOnInit(): void {
    this.isHandset$.subscribe(
      handset => {
        this.isHandSet = handset;
        this.dashboards = this.dashboardsService.toggleDashboardsView(handset);
      });
  }

  changeChartsAmount(): void {
    this.dashboardsService.changeAmountOfDashboards(this.chartsAmount);
    this.dashboards = this.dashboardsService.toggleDashboardsView(this.isHandSet);
  }
}
