import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { UserProfile } from '../profile/userProfile';
import {environment} from "../../environments/environment";
import { FullUser } from "../models/fullUser";
import { UserP2 } from '../models/userP2';

// /api/auth/id => id

@Injectable()
export class ProfileService {
  envPath: string = environment.path;
  idUrl: string = this.envPath + "/api/auth/id";
  identityUrl: string = this.envPath + '/api/user';
  skillsUrl: string = this.envPath + '/api/skills';
  updateUrl: string = this.envPath + '/api/employee/update';
  companyUrl: string = this.envPath + '/api/company';

  constructor(private _http: HttpClient) { }

  getIdentity(): Observable<FullUser> {
    let url = this.identityUrl + "/me";
    return this._http.get<FullUser>(url);
  }

  getStrangerIdentity(user_id: string): Observable<FullUser>{
    let url = this.identityUrl + "/" + user_id;
    return this._http.get<FullUser>(url);
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

  
  // setLanguages(language): Observable<any>{
  //   let url = this.updateUrl;

  //   return this._http.post<any>(url, language);
  // }
  
  // setSpecializations(specialization): Observable<any>{
  //   let url = this.updateUrl;

  //   return this._http.post<any>(url, specialization);
  // }


  getSoftwareNames(): Observable<string[]>{
    let url: string = this.skillsUrl + "/software";
    return this._http.get<string[]>(url);
  }



  // setSoftware(software): Observable<any>{
  //   let url = this.updateUrl;

  //   return this._http.post<any>(url, software);
  // }

  getCertificationsNames(): Observable<string[]>{
    let url: string = this.skillsUrl + "/certifications";
    return this._http.get<string[]>(url);
  }

  


  // setCertifications(certifications): Observable<any>{
  //   let url = this.updateUrl;

  //   return this._http.post<any>(url, certifications);
  // }

  getCategoriesNames(): Observable<string[]>{
    let url: string = this.skillsUrl + "/categories";
    return this._http.get<string[]>(url);
  }

  // setCategories(categories): Observable<any>{
  //   let url = this.updateUrl;
  //   return this._http.post<any>(url, categories);
  // }

  company = {
    create: (data): Observable<any> =>{
      let url = this.companyUrl + '/create';
      return this._http.post<any>(url, data);
    },
    update: function(){

    },
    delete: (NIP: string): Observable<string> =>{
      let url = this.companyUrl + '/delete';
      let obj = {"NIP": NIP}
      return this._http.post<string>(url,obj);
    }
  }

  updateEmployee(tab): Observable<any>{
      let url = this.updateUrl;
      return this._http.post<any>(url, tab);
    }

  updateUser(tab): Observable<any>{
    let url = this.envPath + '/api/user/update';
    return this._http.post<any>(url, tab);
  }



}
