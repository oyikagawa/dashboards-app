import { Component, OnInit } from '@angular/core';
import {ChartService} from '../services/chart.service';
import {ActivatedRoute} from '@angular/router';
import {DateAndChartTypeBase, datePickerProviders} from '../base-functionality/date-and-chart-type-base';
import {IChartWoData} from '../chart-interfaces';
import {FormControl} from '@angular/forms';
import {Moment} from 'moment/moment';
import {MatDatepicker} from '@angular/material/datepicker';
import {ExtendedChartService} from '../services/extended-chart.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-extended-chart',
  templateUrl: './extended-chart.component.html',
  styleUrls: ['./extended-chart.component.css'],
  providers: [
    datePickerProviders,
    ChartService,
    ExtendedChartService]
})
export class ExtendedChartComponent extends DateAndChartTypeBase implements OnInit {

  chartId: number;
  chart: Highcharts.Chart;
  isLoading = true;

  additionalChartsControl = new FormControl();

  constructor(public extChartService: ExtendedChartService,
              private router: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.chartId = +this.router.snapshot.paramMap.get('id');
    const chartsTemp$ = this.extChartService.loadAllCharts();
    chartsTemp$.forEach(
      val => {
        val.subscribe(chartData => {
          this.isLoading = false;
          this.extChartService.addChart(chartData);

          const chartOptionsTemp = this.extChartService.getChart(this.chartId);
          this.chart = Highcharts.chart(`chart${this.chartId}`, chartOptionsTemp);
        });
      }
    );
    this.extChartService.getChartsToAdd(this.chartId);
    this.extChartService.addToCurAddedCharts(this.chartId);
  }

  chosenMonthHandler(date: FormControl, normalizedMonth: Moment, datepicker: MatDatepicker<any>): void {
    super.chosenMonthHandler(date, normalizedMonth, datepicker);
    this.toggleChartData();
  }

  toggleChartData(): void {
    const optionsTemp = this.extChartService.toggleChartData(this.dateFrom, this.dateTo);
    this.chart.update(optionsTemp, true);
  }

  addNewChart(chart: IChartWoData): void {
    const optionsTemp = this.extChartService.toggleChartsInSeries(chart, this.dateFrom, this.dateTo);
    if (typeof optionsTemp === 'number') {
      this.chart.series[optionsTemp].remove(true);
    } else {
      this.chart.addSeries(optionsTemp);
    }
  }

  changeChartsType(event: MouseEvent): void {
    super.changeChartsType(event);
    this.chart.update({chart: {type: this.chartType}}, true);
  }

  changeColor(chartId: number, chartIdx: number, chartColor: string): void {
    if (typeof this.chart !== 'undefined') {
      this.extChartService.updateColors(chartId, chartColor);
      this.chart.series[chartIdx].update({color: chartColor} as Highcharts.SeriesColumnOptions, true);
    }
  }
}
