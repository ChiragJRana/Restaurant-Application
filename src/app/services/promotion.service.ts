import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import {  catchError, map } from 'rxjs/operators';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL + 'promotions')
      .pipe(catchError(this.processHttpMsgServise.handleErrors));
  }
  getPromotion(id:string):Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHttpMsgServise.handleErrors));
  }
  getFeaturedPromotion():Observable<Promotion> {
     return this.http.get<Promotion>(baseURL+'promotions?featured=true')
     .pipe(
        map(data => data[0]),
        catchError(this.processHttpMsgServise.handleErrors
        ));
  }
  constructor(private http: HttpClient,
              private processHttpMsgServise: ProcessHTTPMsgService) { }
}