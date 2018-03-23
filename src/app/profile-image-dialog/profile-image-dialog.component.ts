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
  fileEntry;
  message: string;
  public loading: boolean;

  constructor(public thisDialogRef: MatDialogRef<ProfileImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _http: HttpClient) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    if(this.fileEntry){
      this.fileEntry.file((file: File) => {
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        this._http.post(`${this.apiEndPoint}`, formData)
        .catch(error => Observable.throw(error))
        .subscribe(
            data => console.log('success'),
            error => console.log(error)
        )
      })
    } else {
        this._http.post(`${this.apiEndPoint}`, this.formData)
        .catch(error => Observable.throw(error))
        .subscribe(
            data => console.log('success'),
            error => console.log(error)
        )
      }
    
    this.thisDialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

  public dropped(event: UploadEvent) {
    this.loading = true;
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry = fileEntry;
        // fileEntry.file((file: File) => {
        //   let formData:FormData = new FormData();
        //   formData.append('uploadFile', file, file.name);
        //   this.formData = formData;
          
          this.message = "Twoje zdjęcie zostało załadowane. Aby ustawić je na profilowe kliknij 'Dodaj'"
          
          
        // });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
    this.loading = false;
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        this.formData = formData;
          
        this.message = "Twoje zdjęcie zostało załadowane. Aby ustawić je na profilowe kliknij 'Dodaj'"
        

    }
}
}

