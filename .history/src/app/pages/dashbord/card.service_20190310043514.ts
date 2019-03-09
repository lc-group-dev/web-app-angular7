import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


const getCheckDayInfoSum_API = '/api/checkDayInfo/summary/';
const getCheckDayInfoDay_API = '/api/checkDayInfo/day';

 export interface Summary {
  date: string;
  checkedCount: number;
  totalUserCount: number;
  checkRatio: string;
}

 export interface Day {
  acceptedSubmission: number;
  gmt_create: string;
  gmt_modified: string;
  info_id: string;
  address: string;
  username: string;
  avatar: string;
  website: string;
  acceptanceRate: number;
  date: string;
  isChecked: number;
  solvedProblemToday: number;
  solvedQuestion: number;
  submission: number;
  submissionToday: number;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCheckDayInfoSum(date: string): Observable<Summary[]> {
    const params = new HttpParams().append('date', date);
    return this.http.get<Summary[]>(getCheckDayInfoSum_API , {params});
  }
  getCheckDayInfoDay(date:string): Observable<Day[]> {
    const params = new HttpParams().append('date', date);
    return this.http.get<Day[]>(getCheckDayInfoDay_API, {params});
  }
}
