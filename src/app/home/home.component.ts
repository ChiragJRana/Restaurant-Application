import { Component, OnInit } from '@angular/core';
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

  constructor(private promotionService:PromotionService, private dishService:DishService,private leaderService:LeadersService) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .then((dish)=> {
      this.dish = dish;
    });
    this.promotionService.getFeaturedPromotion()
    .then((promotion)=>{
      this.promotion = promotion;
    });
    this.leaderService.getFeaturedLeader().then((leader)=>{
      this.leader= leader;
    });
  }

}
