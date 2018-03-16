import { Component, OnInit } from '@angular/core';
import { AskService } from '../services/ask.service';
import { ProfileService } from '../services/profile.service';
import { FullUser } from '../models/fullUser';
import { Ask } from '../models/ask';
import { BidService } from '../services/bid.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {

  user: FullUser;
  asks: {"count": number,
         "asks": Ask[]};
  czyAsk: boolean = false;
  description: string;
  salary: number;
  

  constructor(private _askService: AskService, private _profileService: ProfileService, private _bidService: BidService) { }

  ngOnInit() {
    this._profileService.getIdentity().subscribe(user => {
      this.user = user;
      console.log(JSON.stringify(this.user))
      this._askService.getFilteredAsks(this.user, 10,0).subscribe(asks => {
        this.asks = asks;
        this.czyAsk = true;
      });
    });
    
  }
  takeOffer(id: string): void{
    this._bidService.createBid(id,this.description, this.salary).subscribe();
    
  }
  
}
