import { Injectable } from '@angular/core';
import {Dish} from '../shared/Dish';
import { Dishes } from '../shared/dishes';
import { of, pipe, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DishService {
    getDishes(): Observable<Dish[]>{
      return of(Dishes).pipe(delay(500));
    }
    getDish(id:string):Observable<Dish> {
      return of(Dishes.filter(dish => dish.id === id)[0]).pipe(delay(500));
    }
    getFeaturedDish():Observable<Dish> {
      return of(Dishes.filter(dish => dish.featured)[0]).pipe(delay(500));
    }
    getDishIds(): Observable<string[] |any>{
      return of(Dishes.map(dish => dish.id));
    }
  constructor() { }
}
