import { Injectable } from '@angular/core';
import { leaders } from '../shared/Leaders';
import { Leader } from '../shared/Leader';

@Injectable({
  providedIn: 'root'
})
export class LeadersService {
  
  getLeaders(){
    return leaders;
  }
  getFeaturedLeader(){
    return leaders.filter((leader)=> leader.featured)[0];
  }
  getleader(id:string):Leader{
    return leaders.filter((leader)=> (leader.id=== id))[0];
  }

  constructor() { }
}
