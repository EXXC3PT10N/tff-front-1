import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.css']
})
export class DialogProfileComponent implements OnInit {
  
  _filter: string;
  // jsonName: string;
  // tabNames: string[];
  filteredTab: string[];
  constructor(public thisDialogRef: MatDialogRef<DialogProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
  }

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  get filter(): string {
    return this._filter;
  }
  
  set filter(value: string) {
  this._filter = value;
  this.filteredTab = this.filter ? this.performFilter(this.filter, this.data.tabNames) : null;
  }
  

  performFilter(filterBy: string, variable: string[]): string[] {
    filterBy = filterBy.toLocaleLowerCase();
    return variable.filter((F: string) =>
          F['name'].toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  addToTab(name: string): void{
    let tmp = { "name": name }
    this.data.content.presents.push(tmp);
  }

  deleteFromTab(name: string): void{
    let obj = {"name": name};
    let pos = this.data.content.presents.map(function(e) { return e.name; }).indexOf(name);
    
    if(pos > -1)
      this.data.content.presents.splice(pos, 1);  
  }

  }
  


