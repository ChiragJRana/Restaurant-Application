import { Injectable } from '@angular/core';
import {Dish} from '../shared/Dish';
import { Observable } from 'rxjs';
import { map , catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseUrl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {
    getDishes(): Observable<Dish[]>{
      return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHttpMsgService.handleErrors));
    }
    getDish(id:string):Observable<Dish> {
      return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHttpMsgService.handleErrors));
    }
    getFeaturedDish():Observable<Dish> {
      return this.http.get<Dish>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHttpMsgService.handleErrors));
    }
    getDishIds(): Observable<string[] |any>{
      return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(this.processHttpMsgService.handleErrors));
    }
  constructor(private http: HttpClient,
              private processHttpMsgService: ProcessHTTPMsgService) { }
}
