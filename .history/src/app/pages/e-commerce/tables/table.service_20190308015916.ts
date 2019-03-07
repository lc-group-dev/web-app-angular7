import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const getCheckDayInfoRatio_API = '/api/checkDayInfo/checkRatioList';

interface Ratio {
  date: string;
}



@Injectable({
  providedIn: 'root',
})
export class TableService {

  constructor(private http: HttpClient) { }

  getCheckDayInfoRaio(param: Ratio) {
    return this.http.get(getCheckDayInfoRatio_API + param);
  }
}
