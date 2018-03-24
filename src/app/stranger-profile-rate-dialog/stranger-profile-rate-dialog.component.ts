import { Component, OnInit, Inject } from '@angular/core';
import { FillPipe } from '../pipes/fill.pipe'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-stranger-profile-rate-dialog',
  templateUrl: './stranger-profile-rate-dialog.component.html',
  styleUrls: ['./stranger-profile-rate-dialog.component.css']
})
export class StrangerProfileRateDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<StrangerProfileRateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close({status: 'Confirm', result: this.data});
  }
  onCloseCancel() {
    this.thisDialogRef.close({status: 'Cancel'});
  }


}
