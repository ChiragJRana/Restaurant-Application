import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Promotions } from '../shared/promotions';
import { delay } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  getPromotions():Observable<Promotion[]>{
    return of(Promotions).pipe(delay(500));
  }
  getPromotion(id:string):Observable<Promotion> {
    return of(Promotions.filter((promotion)=> promotion.id === id)[0]).pipe(delay(500));
  }
  getFeaturedPromotion():Observable<Promotion> {
     return of(Promotions.filter( promotion => promotion.featured)[0]).pipe(delay(500));
  }
  constructor() { }
}