import { Injectable } from '@angular/core';
import {Dish} from '../shared/Dish';
import { Dishes } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  getDishes(): Dish[]{
    return Dishes;
  }
  constructor() { }
}
