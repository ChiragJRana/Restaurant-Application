import { Component, OnInit, Inject } from '@angular/core';
import { PromotionService } from '../services/promotion.service';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/Dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/Leader';
import { LeadersService } from '../services/leaders-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion:Promotion;
  leader: Leader;
  BaseURL : string;
  constructor(private promotionService:PromotionService,
              private dishService:DishService,
              private leaderService:LeadersService,
              @Inject('BaseURL')  BaseURL) {
                  this.BaseURL = BaseURL
               }

  ngOnInit(): void {
    
    this.dishService.getFeaturedDish()
    .subscribe((dish)=> {
      this.dish = dish;
    });

    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion)=>{
      this.promotion = promotion;
    });

    this.leaderService.getFeaturedLeader()
    .subscribe((leader)=>{
      this.leader= leader;
    });
  }

}
