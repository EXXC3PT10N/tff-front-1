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
    update: (id: string, data): Observable<any>=>{
      let url = this.companyUrl + '/update/'+id;
      return this._http.post<any>(url, data);

    },
    delete: (id: string): Observable<string> =>{
      let url = this.companyUrl + '/delete/' + id;
      // let obj = {"NIP": NIP}
      return this._http.delete<string>(url);
    },
    getAllComp: (): Observable<any> =>{
      let url = this.envPath + "/api/employer/companies/my";
      return this._http.get<any>(url);
    },
    getAllCompOfAStranger: (id: string): Observable<any> =>{
      let url =  environment.path + '/api/employer/companies/' + id;
      console.log(url);
      return this._http.get<any>(url);
    },
  };

  updateEmployee(tab): Observable<any>{
      let url = this.updateUrl;
      return this._http.post<any>(url, tab);
    }

  updateEmployer(obj): Observable<any>{
    let url = this.envPath + "/api/employer/update";
    return this._http.post<any>(url,obj);
  }

  updateUser(tab): Observable<any>{
    let url = this.envPath + '/api/user/update';
    return this._http.post<any>(url, tab);
  }



}
