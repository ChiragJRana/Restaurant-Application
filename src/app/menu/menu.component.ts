import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import {Dishes} from '../shared/dishes';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes:Dish[];
  // private baseUrl: string
  constructor(private dishservice:DishService,
    @Inject('BaseURL') private BaseURL ) { 
      // this.baseUrl = baseURL;
    }
  ngOnInit(): void {
    this.dishservice.getDishes()
    .subscribe((dishes)=>{
      this.dishes = dishes;
    });
  }
}
