import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './profile-image-dialog.component.html',
  styleUrls: ['./profile-image-dialog.component.css']
})
export class ProfileImageDialogComponent implements OnInit {

  public files: UploadFile[] = [];
  apiEndPoint: string = "http://localhost:3000/api/user/image/upload";
  formData: FormData;

  constructor(public thisDialogRef: MatDialogRef<ProfileImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _http: HttpClient) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this._http.post(`${this.apiEndPoint}`, this.formData)
          .catch(error => Observable.throw(error))
          .subscribe(
              data => console.log('success'),
              error => console.log(error)
          )
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          
          let formData:FormData = new FormData();
          formData.append('uploadFile', file, file.name);
          this.formData = formData;
          
          // // You could upload it like this:
          // const formData = new FormData()
          // formData.append('logo', file, relativePath)
 
          // // Headers
          // const headers = new HttpHeaders({
          //   'security-token': 'mytoken'
          // })
 
          // this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          // .subscribe(data => {
          //   // Sanitized logo returned from backend
          // })
          
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }
}



}
