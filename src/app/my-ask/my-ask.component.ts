import { Component, OnInit } from '@angular/core';
import { Ask,Bid } from '../models/ask';
import { AskService } from '../services/ask.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { MatDialog } from '@angular/material';
import { MyAskSelectBidDialogComponent } from '../my-ask-select-bid-dialog/my-ask-select-bid-dialog.component';


@Component({
  selector: 'app-my-ask',
  templateUrl: './my-ask.component.html',
  styleUrls: ['./my-ask.component.css']
})
export class MyAskComponent implements OnInit {

  userAsk: Ask;
  bids: Bid[];
  acceptedBids: Bid[] = new Array();
  unacceptedBids: Bid[] = new Array();
  askId: string;
  loading: boolean = false;
  dialogResult: string;
  constructor(private _askService: AskService, private _route: ActivatedRoute, private _profileService: ProfileService, public dialog: MatDialog) {
    this.askId = this._route.snapshot.paramMap.get('id')
   }

  ngOnInit() {
    this._askService.getAsk(this.askId).subscribe(ask => {
      this.loading = false
      this.userAsk = ask;
      this.bids = ask.bids;
      for(let bid of this.bids){
        this._profileService.getStrangerIdentity(bid.employee.user_id).subscribe(user => bid.employee["name"] = user.user.first_name + " " + user.user.last_name)
        if(bid.is_accepted)
          this.acceptedBids.push(bid);
        else this.unacceptedBids.push(bid);
      }
      this.loading = true;
      // console.log("Twoj ask: "+JSON.stringify(ask))
    });
  }

  openDialog(bid: Bid, condition: boolean) {
    let dialogRef = this.dialog.open(MyAskSelectBidDialogComponent, {
      width: '600px',
      data: {
        _userId: bid.employee.user_id,
        description: bid.description,
        salary: bid.salary,
        condition: condition
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result.status}`);
      this.dialogResult = result.status;
      
      if(result.status == "Confirm" && condition)
      {
        this._askService.acceptBid(bid._id).subscribe();
      }
    });
  }
  
}
