import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {defaultChartsWoDataArray} from './default-data/default-charts-wo-data-array';

@Injectable({
  providedIn: 'root'
})
export class ChartGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idxTemp = defaultChartsWoDataArray.findIndex(val => val.id === +route.paramMap.get('id'));
    return idxTemp !== -1 ? true : this.router.navigate(['/none']);
  }
}
