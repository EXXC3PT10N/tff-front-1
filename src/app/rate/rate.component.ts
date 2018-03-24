import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RateService } from '../services/rate.service';
import { Rates } from '../models/rates';
import { ProfileService } from '../services/profile.service';
import { FullUser } from '../models/fullUser';
import { FillPipe } from '../pipes/fill.pipe'

@Component({
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
  
})
export class RateComponent implements OnInit {

  rates: Rates;
  user: FullUser;
  identyfikator: string;

  constructor(private _router: Router, private _rateService: RateService, private _profileService: ProfileService, private _route: ActivatedRoute) {
    this.identyfikator = this._route.snapshot.paramMap.get('id')
   }

  ngOnInit() {
    if(this.identyfikator == "me")
      {
        this._profileService.getIdentity().subscribe(user => {
          this.user = user;
          // this.user.user.rate = 1.5;
          console.log("Ocena: "+ this.user.rate)
          this._rateService.getRates(user.user._id).subscribe(rates => {
            this.rates = rates
        
          });
        })
      } else{
        this._profileService.getStrangerIdentity(this.identyfikator).subscribe(user => {
          this.user = user;
          // this.user.user.rate = 1.5;
          console.log("Ocena: "+ this.user.rate)
          this._rateService.getRates(user.user._id).subscribe(rates => {
            this.rates = rates
          });
      
        });
      }

    
      
   
  }

  

}
