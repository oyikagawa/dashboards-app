import * as moment from 'moment/moment';
import {Moment} from 'moment/moment';
import {FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const datePickerProviders = [
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS}
];

export class DateAndChartTypeBase{

  minDate = new Date(1894, 12);
  maxDate = new Date(2016, 11);

  dateFrom = moment(this.minDate).format('MMM yyyy');
  dateTo = moment(this.maxDate).format('MMM yyyy');

  private controlFrom: any;
  private controlTo: any;

  dateFromControl = new FormControl(moment(this.minDate));
  dateToControl = new FormControl(moment(this.maxDate));

  chartType: string;

  chosenYearHandler(date: FormControl, normalizedYear: Moment): void {
    const ctrlValue = date.value;
    ctrlValue.year(normalizedYear.year());
    date.setValue(ctrlValue);
  }

  chosenMonthHandler(date: FormControl, normalizedMonth: Moment, datepicker: MatDatepicker<any>): void {
    const ctrlValue = date.value;
    ctrlValue.month(normalizedMonth.month());

    if ((this.convertDatepickerId(datepicker) % 2) === 0) {
      this.dateFrom = ctrlValue.format('MMM yyyy');
      this.controlFrom = ctrlValue;
    } else {
      this.dateTo = ctrlValue.format('MMM yyyy');
      this.controlTo = ctrlValue;
    }

    const fromTemp = new Date(this.dateFrom).getTime();
    const toTemp = new Date(this.dateTo).getTime();
    if (fromTemp > toTemp) {
      this.changeDateBoundaries();
    } else {
      date.setValue(ctrlValue);
    }

    datepicker.close();
  }

  convertDatepickerId(datepicker: MatDatepicker<any>): number {
    return +datepicker.id.slice(datepicker.id.length - 1);
  }

  changeChartsType(event: MouseEvent): void {
    // @ts-ignore
    let temp = event.composedPath()[0].innerText;
    temp = temp.charAt(0).toLowerCase() + temp.slice(1);
    this.chartType = temp;
  }

  private changeDateBoundaries(): void {
    let temp = this.dateTo;
    this.dateTo = this.dateFrom;
    this.dateFrom = temp;
    temp = this.controlTo;
    this.controlTo = this.controlFrom;
    this.controlFrom = temp;
    this.dateFromControl.setValue(this.controlFrom);
    this.dateToControl.setValue(this.controlTo);
  }

}
