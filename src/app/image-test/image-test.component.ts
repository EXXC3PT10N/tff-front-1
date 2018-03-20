import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader,FileUploadModule, FileUploaderOptions } from 'ng2-file-upload';
import { AuthService } from '../services/auth.service';
import { RequestOptions, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from '../services/profile.service';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';



const URL = 'http://localhost:3000/api/user/image/upload';

@Component({
  templateUrl: './image-test.component.html',
  styleUrls: ['./image-test.component.css']
})
export class ImageTestComponent implements OnInit {

  // token: string;

  // // public uploader:FileUploader = new FileUploader({url: URL,authToken: this.token});
  // public uploader:FileUploader = new FileUploader({
  //   url: URL,
  //   headers: [{
  //     name: "Authorization",
  //     value: this.token
  //   }]});
  

  // public hasBaseDropZoneOver:boolean = false;
  // public hasAnotherDropZoneOver:boolean = false;

  // public fileOverBase(e:any):void {
  //   this.hasBaseDropZoneOver = e;
  // }

  // public fileOverAnother(e:any):void {
  //   this.hasAnotherDropZoneOver = e;
  // }
  
  image: any;
  url: string = 'http://localhost:3000/user/';
  apiEndPoint: string = "http://localhost:3000/api/user/image/upload"
  warunek: boolean = false;
  
  
  dialogResult: string;
  
  constructor(private _authService: AuthService, private _http: HttpClient, private _profileService: ProfileService, public dialog: MatDialog) { 
    // this.token = this.getToken();
    // console.log("token: "+this.token)
  }


  ngOnInit() {
    // this._profileService.getIdentity().subscribe(data => this._profileService.getImage(data.user.image).subscribe(dane => {
    
    //   console.log("Dane"+ dane)
    // }))
    this._profileService.getIdentity().subscribe(data => {
      this.url += data.user.image
      this.warunek = true;
    })
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        
      
        this._http.post(`${this.apiEndPoint}`, formData)
            .catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            )
    }
}

  // getToken(): string{
  //   return this._authService.token
 
  // }
}
