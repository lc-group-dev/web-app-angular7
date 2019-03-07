import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const checkDayInfo_API = '/checkDayInfo/summary';

interface Summary {
  date: string;
  checkedCount: number;
  totalUserCount: number;
  checkRatio: string;
}

@Injectable({
  providedIn: 'root',
})
export class CardserviceService {

  constructor(private http: HttpClient) { }

  getCheckDayInfo() {
    return this.http.get<Summary[]>(checkDayInfo_API);
  }
}
