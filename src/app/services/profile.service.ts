import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { UserProfile } from '../profile/userProfile';
import {environment} from "../../environments/environment";

// /api/auth/id => id

@Injectable()
export class ProfileService {
  idUrl: string = environment.path + "/api/auth/id";
  identityUrl: string = environment.path + '/api/user/me';

  constructor(private _http: HttpClient) { }

  getIdentity(): Observable<UserProfile> {
      return this._http.get<UserProfile>(this.identityUrl)
  }
  getId(): Observable<string>{
    return this._http.get<string>(this.idUrl)
    //.do(data => console.log(JSON.stringify(data)));
    
  }

}
