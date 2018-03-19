import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader,FileUploadModule, FileUploaderOptions } from 'ng2-file-upload';
import { AuthService } from '../services/auth.service';
import { RequestOptions, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';




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
  
  apiEndPoint: string = "http://localhost:3000/api/user/image/upload"
  
  constructor(private _authService: AuthService, private _http: HttpClient) { 
    // this.token = this.getToken();
    // console.log("token: "+this.token)
  }


  ngOnInit() {
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
