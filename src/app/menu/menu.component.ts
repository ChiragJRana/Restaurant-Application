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
  errMsg: string;
  BaseURL: string;
  constructor(private dishservice:DishService,
    @Inject('BaseURL')  BaseURL ) { 
      this.BaseURL = BaseURL;
    }
  ngOnInit(): void {
    this.dishservice.getDishes()
    .subscribe(
      (dishes)=>{ this.dishes = dishes},
      (error) => {this.errMsg = <any>error}
      );
  }
}
