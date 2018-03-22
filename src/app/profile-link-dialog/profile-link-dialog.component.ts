import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './profile-link-dialog.component.html',
  styleUrls: ['./profile-link-dialog.component.css']
})
export class ProfileLinkDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<ProfileLinkDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _http: HttpClient) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close({status: 'Confirm', result: this.data.link});
  }
  onCloseCancel() {
    this.thisDialogRef.close({status: 'Cancel'});
  }

}
