import { Injectable } from '@angular/core';
import { leaders } from '../shared/Leaders';
import { Leader } from '../shared/Leader';
import { of, Observable } from 'rxjs';
import { delay }  from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeadersService {
  
  getLeaders():Observable<Leader[]>{
    return  of(leaders).pipe(delay(500));
  }
  getFeaturedLeader(): Observable<Leader>{
    return of(leaders.filter((leader) => { return leader.featured})[0]).pipe(delay(500));
    //  To be Noted  as {} ismei karoo return () naitoh its like a lambda function....
  }
  getleader(id:string):Observable<Leader>{
    return of(leaders.filter((leader)=> (leader.id === id))[0]).pipe(delay(500));
  }

  constructor() { }
}
