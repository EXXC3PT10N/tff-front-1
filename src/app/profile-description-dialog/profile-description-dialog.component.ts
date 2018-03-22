import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './profile-description-dialog.component.html',
  styleUrls: ['./profile-description-dialog.component.css']
})
export class ProfileDescriptionDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<ProfileDescriptionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close({status: 'Confirm', result: this.data.description});
  }
  onCloseCancel() {
    this.thisDialogRef.close({status: 'Cancel'});
  }

}
