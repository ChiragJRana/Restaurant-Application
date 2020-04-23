import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
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
