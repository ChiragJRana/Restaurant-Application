import { Injectable } from '@angular/core';
import { leaders } from '../shared/Leaders';
import { Leader } from '../shared/Leader';

@Injectable({
  providedIn: 'root'
})
export class LeadersService {
  
  getLeaders():Promise<Leader[]>{
    return new Promise((resolve)=>{
      // Simulate server Latency by 2 sec
      setTimeout(()=> resolve(leaders),2000)
    });
  }
  getFeaturedLeader(): Promise<Leader>{
    return new Promise((resolve)=>
      setTimeout(()=>resolve(leaders.filter((leader)=> (leader.featured))[0]),2000));
  }
  getleader(id:string):Promise<Leader>{
    return new Promise((resolve)=>{
      setTimeout(()=> resolve(leaders.filter((leader)=> {leader.id === id })[0]),2000);
    });
  }

  constructor() { }
}
