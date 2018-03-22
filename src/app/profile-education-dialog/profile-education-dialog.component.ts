import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './profile-education-dialog.component.html',
  styleUrls: ['./profile-education-dialog.component.css']
})
export class ProfileEducationDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<ProfileEducationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close({status: 'Confirm', result: this.data.education});
  }
  onCloseCancel() {
    this.thisDialogRef.close({status: 'Cancel'});
  }

}
