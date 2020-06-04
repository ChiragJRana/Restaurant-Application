import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';
import { baseURL } from '../shared/baseUrl';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  
  submitFeedback(feedback:Feedback): Observable<Feedback>{
    const httpOptions = {
      headers : new HttpHeaders(
        {'Content-Type': 'application/json'}
    )};
    
    return this.http.post<Feedback>(baseURL + 'feedback/',feedback,httpOptions)
    .pipe(catchError(this.processHttpMsgService.handleErrors));
  }

  constructor(private http :  HttpClient,
              private processHttpMsgService: ProcessHTTPMsgService) { }
}
