import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FullUser } from '../models/fullUser';
import { ProfileService } from '../services/profile.service';

@Component({
  templateUrl: './my-ask-select-bid-dialog.component.html',
  styleUrls: ['./my-ask-select-bid-dialog.component.css']
})
export class MyAskSelectBidDialogComponent implements OnInit {

  user: FullUser;

  constructor(public thisDialogRef: MatDialogRef<MyAskSelectBidDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private _profileService: ProfileService) { }

  ngOnInit() {
    this._profileService.getStrangerIdentity(this.data['_userId']).subscribe(user => this.user = user)
  }

  onCloseConfirm() {
    this.thisDialogRef.close({status: 'Confirm', result: this.data});
  }
  onCloseCancel() {
    this.thisDialogRef.close({status: 'Cancel'});
  }


}
