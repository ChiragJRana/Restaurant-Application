import { Component, OnInit} from '@angular/core';
import {Dish} from '../shared/Dish';
import { ActivatedRoute } from '@angular/router';
import {Location } from '@angular/common';
import { DishService } from '../services/dish.service';
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dishi:Dish;
  constructor(private route: ActivatedRoute, private location: Location, private dishService: DishService) { 
   
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.dishi = this.dishService.getDish(id);
  }

  goBack():void {
    this.location.back();
  }
}
