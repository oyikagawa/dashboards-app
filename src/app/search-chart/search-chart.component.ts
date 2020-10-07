import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {IChartWoData} from '../chart-interfaces';
import {Router} from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import {defaultChartsWoDataArray} from '../default-data/default-charts-wo-data-array';

@Component({
  selector: 'app-search-chart',
  templateUrl: './search-chart.component.html',
  styleUrls: ['./search-chart.component.css']
})
export class SearchChartComponent implements OnInit {

  searchControl = new FormControl();
  filteredOptions$: Observable<IChartWoData[]>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(val => typeof val === 'string' ? val : val.title),
      map(title => title ? this.filter(title) : defaultChartsWoDataArray.slice())
    );
  }

  filter(title: string): IChartWoData[] {
    const filterTitle = title.toLowerCase();
    return defaultChartsWoDataArray.filter(chart => chart.title.toLowerCase().indexOf(filterTitle) === 0);
  }

  displayView(chart: IChartWoData): string {
    return chart && chart.title ? chart.title : '';
  }

  redirectToDashboard(): void {
    if (this.searchControl.value !== null && typeof this.searchControl.value.id !== 'undefined') {
      this.router.navigateByUrl(`/chart/${this.searchControl.value.id}`);
    }
  }

}
