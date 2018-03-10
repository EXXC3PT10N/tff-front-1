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
  skillsUrl: string = this.envPath + '/api/skills';
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
    let url: string = this.skillsUrl + "/languages";
    return this._http.get<string[]>(url);
  }

  getSpecializationsNames(): Observable<string[]>{
    let url: string = this.skillsUrl + "/specializations";
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
  
  setSpecializations(specialization): Observable<any>{
    let url = this.updateUrl + "/specs";

    return this._http.post<any>(url, specialization);
  }

  getUserSpec(): Observable<any>{
    return this._http.get<any>(this.identityUrl)
    //.do(data => console.log(JSON.stringify(data)));
  }

  getSoftwareNames(): Observable<string[]>{
    let url: string = this.skillsUrl + "/software";
    return this._http.get<string[]>(url);
  }

  getUserSoftware(): Observable<any>{
    return this._http.get<any>(this.identityUrl)
    //.do(data => console.log(JSON.stringify(data)));
  }


  setSoftware(software): Observable<any>{
    let url = this.updateUrl + "/software";

    return this._http.post<any>(url, software);
  }

  getCertificationsNames(): Observable<string[]>{
    let url: string = this.skillsUrl + "/certifications";
    return this._http.get<string[]>(url);
  }

  getUserCertifications(): Observable<any>{
    return this._http.get<any>(this.identityUrl)
    //.do(data => console.log(JSON.stringify(data)));
  }


  setCertifications(certifications): Observable<any>{
    let url = this.updateUrl + "/certifications";

    return this._http.post<any>(url, certifications);
  }

}
