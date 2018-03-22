import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-profile-city-dialog',
  templateUrl: './profile-city-dialog.component.html',
  styleUrls: ['./profile-city-dialog.component.css']
})
export class ProfileCityDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<ProfileCityDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close({status: 'Confirm', result: this.data.city});
  }
  onCloseCancel() {
    this.thisDialogRef.close({status: 'Cancel'});
  }

}
