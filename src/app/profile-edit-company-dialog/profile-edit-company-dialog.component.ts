import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './profile-edit-company-dialog.component.html',
  styleUrls: ['./profile-edit-company-dialog.component.css']
})
export class ProfileEditCompanyDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<ProfileEditCompanyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close({status: 'Confirm', result: this.data});
  }
  onCloseDelete() {
    this.thisDialogRef.close({status: 'Delete'});
  }
  onCloseCancel() {
    this.thisDialogRef.close({status: 'Cancel'});
  }

}
