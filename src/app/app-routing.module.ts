import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {SearchChartComponent} from './search-chart/search-chart.component';
import {DashboardsComponent} from './dashboards/dashboards.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ExtendedChartComponent} from './extended-chart/extended-chart.component';
import {ChartGuard} from './chart.guard';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'search', component: SearchChartComponent},
  {path: 'dashboards', component: DashboardsComponent},
  {path: 'chart/:id', component: ExtendedChartComponent, canActivate: [ChartGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
