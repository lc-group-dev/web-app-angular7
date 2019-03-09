import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

interface Info {
  info_id: string;
  address: string;
  username: string;
  avator: string;
  website: string;
  acceptanceRate: string;
  date: string;
  isChecked: number;

}

@Injectable({
  providedIn: 'root',
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCheckDayInfo(params: Summary) {
    const query = new HttpParams().append('date', `${params.date}`);
    return this.http.get(getCheckDayInfoSum_API, {params: query});
  }
}
