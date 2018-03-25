import { Component, OnInit } from '@angular/core';
import { AskService } from '../services/ask.service';
import { ProfileService } from '../services/profile.service';
import { FullUser } from '../models/fullUser';
import { Ask } from '../models/ask';
import { BidService } from '../services/bid.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

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
  dialogResult: string;

  constructor(private _askService: AskService, private _profileService: ProfileService, private _bidService: BidService, public dialog: MatDialog) { }

  ngOnInit() {
    this._profileService.getIdentity().subscribe(user => {
      this.user = user;
      
      this._askService.getFilteredAsks(this.user, 10,0).subscribe(asks => {
        this.asks = asks;
        this.czyAsk = true;
        console.log(JSON.stringify(this.asks.asks))
      });
    });
  }

  openDialog(tytul: string, ogloszenie: Ask) {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {
        title: tytul, 
        content: ogloszenie, 
        username: this.user.user.username, 
        _id: this.user.user._id,
        description: '',
        salary: 0
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result.status}`);
      this.dialogResult = result.status;
      if(result.status == "Confirm")
        this.takeOffer(ogloszenie._id, result.result.description, result.result.salary);
    });
  }

  takeOffer(id: string,description: string, salary: number): void{
    this._bidService.createBid(id, description, salary).subscribe();
    
  }
  
}
