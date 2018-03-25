import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

    onCloseConfirm() {
      this.thisDialogRef.close({status: 'Confirm', result: this.data});
    }
    onCloseCancel() {
      this.thisDialogRef.close({status: 'Cancel'});
    }

  ngOnInit() {
  }

}
