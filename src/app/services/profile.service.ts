import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { UserProfile } from '../profile/userProfile';
import {environment} from "../../environments/environment";

// /api/auth/id => id

@Injectable()
export class ProfileService {
  envPath: string = environment.path;
  idUrl: string = this.envPath + "/api/auth/id";
  identityUrl: string = this.envPath + '/api/user/me';
  updateUrl: string = this.envPath + '/api/employee/update';

  constructor(private _http: HttpClient) { }

  getIdentity(): Observable<UserProfile> {
      return this._http.get<UserProfile>(this.identityUrl)
  }
  getId(): Observable<string>{
    return this._http.get<string>(this.idUrl)
    //.do(data => console.log(JSON.stringify(data)));
  }

  getLanguagesNames(): Observable<string[]>{
    let url: string = environment.path + "/api/skills/languages";
    return this._http.get<string[]>(url);
  }

  getUserLanguages(): Observable<any>{
    return this._http.get<any>(this.identityUrl)
    //.do(data => console.log(JSON.stringify(data)));
  }
  
  setLanguages(language): Observable<any>{
    let url = this.updateUrl + "/languages";

    return this._http.post<any>(url, language);
  }

}
