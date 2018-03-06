import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { UserProfile } from './profile/userProfile';

// /api/auth/id => id

@Injectable()
export class ProfileService {

  idUrl: string = "http://192.168.10.201:3000/api/auth/id";
  identityUrl: string = 'http://192.168.10.201:3000/api/user/';

  constructor(private _http: HttpClient) { }

  getIdentity(id: string): Observable<UserProfile> {
      return this._http.get<UserProfile>(this.identityUrl+id)
  }
  getId(): Observable<string>{
    return this._http.get<string>(this.idUrl)
    //.do(data => console.log(JSON.stringify(data)));
    
  }

}
