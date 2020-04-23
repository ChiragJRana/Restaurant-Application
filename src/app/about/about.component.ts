import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/Leader';
import { LeadersService } from '../services/leaders-service.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  
  constructor(private leadeService: LeadersService) { }

  ngOnInit(): void {
    this.leadeService.getLeaders()
      .subscribe((leaders)=> {
        this.leaders = leaders
      });
  }

}
