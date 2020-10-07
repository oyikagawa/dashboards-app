import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartService} from '../services/chart.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [ChartService]
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() chartId: number;
  @Input() dateFrom: string;
  @Input() dateTo: string;
  @Input() chartType: string;

  chart: Highcharts.Chart;
  color: string;

  isLoading = true;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.outputChart();
    if (typeof this.chartService.updateColors(this.chartId) === 'string') {
      // @ts-ignore
      this.color = this.chartService.updateColors(this.chartId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((typeof changes['dateFrom'] !== 'undefined' && !changes['dateFrom'].firstChange) ||
      (typeof changes['dateTo'] !== 'undefined' && !changes['dateTo'].firstChange)) {
      const optionsTemp = this.chartService.getChart(this.chartId, this.dateFrom, this.dateTo);
      this.chart.update(optionsTemp, true);
    }
    if (typeof changes['chartType'] !== 'undefined' && !changes['chartType'].firstChange) {
      this.chart.update({chart: {type: this.chartType}}, true);
    }
  }

  outputChart(): void {
    const chart = this.chartService.getChart(this.chartId);

    if (this.chartService.instanceOfChartOptions(chart)) {
      this.resolveAfter1ms();
    } else {
      chart.subscribe(
        chartData => {
          this.isLoading = false;
          this.chartService.addChart(chartData);

          const chartOptions = this.chartService.getChart(this.chartId);
          this.chart = Highcharts.chart(`chart${this.chartId}`, chartOptions);
        });
    }
  }

  changeColor(): void {
    this.chartService.updateColors(this.chartId, this.color);
    this.chart.series[0].update({color: this.color} as Highcharts.SeriesColumnOptions, true);
  }

  resolveAfter1ms(): void {
    setTimeout(() => {
      this.isLoading = false;
      const chartOptions = this.chartService.getChart(this.chartId, this.dateFrom, this.dateTo);
      this.chart = Highcharts.chart(`chart${this.chartId}`, chartOptions);
    }, 1);
  }
}
