import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const getCheckDayInfoSum_API = '/api/checkDayInfo/summary/';

interface Summary {
  date: string;
  checkedCount: number;
  totalUserCount: number;
  checkRatio: string;
}

interface Date {
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCheckDayInfo(params: Date) {
    return this.http.get<Summary[]>(getCheckDayInfoSum_API + params);
  }
}
