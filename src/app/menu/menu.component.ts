import { Component, OnInit } from '@angular/core';
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
  
  selectedDish :Dish=Dishes[1];  
  constructor(private dishservice:DishService) { }

  ngOnInit(): void {
    this.dishes = this.dishservice.getDishes();
  }
  Onselect(dish){
    this.selectedDish=dish;
  }


}
