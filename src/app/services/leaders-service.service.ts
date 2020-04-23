import { Injectable } from '@angular/core';
import { leaders } from '../shared/Leaders';
import { Leader } from '../shared/Leader';
import { of, Observable } from 'rxjs';
import { delay, catchError, map }  from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class LeadersService {
  
  getLeaders():Observable<Leader[]>{
    return  this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHttpMsgService.handleErrors));
  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership?featured=true')
    .pipe(
      map(data => data[0]),
      catchError(this.processHttpMsgService.handleErrors)
    );
    //  To be Noted  as {} ismei karoo return () naitoh its like a lambda function....
  }
  getleader(id:string):Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership' + id)
    .pipe(catchError(this.processHttpMsgService.handleErrors));
  }

  constructor(private http: HttpClient,
              private processHttpMsgService: ProcessHTTPMsgService) { }
}
