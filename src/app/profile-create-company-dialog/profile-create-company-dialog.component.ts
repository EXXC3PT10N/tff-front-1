import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './profile-create-company-dialog.component.html',
  styleUrls: ['./profile-create-company-dialog.component.css']
})
export class ProfileCreateCompanyDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<ProfileCreateCompanyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close({status: 'Confirm', result: this.data});
  }
  onCloseCancel() {
    this.thisDialogRef.close({status: 'Cancel'});
  }

}
