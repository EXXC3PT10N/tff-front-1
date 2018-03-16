import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {environment} from "../../environments/environment";
import { Ask } from '../models/ask';
import { FullUser } from '../models/fullUser';

// /api/auth/id => id

@Injectable()
export class AskService {
  envPath: string = environment.path + "/api";

  constructor(private _http: HttpClient) { }

  addAsk(data: Ask): Observable<Ask>{
    let url: string = this.envPath + "/ask/create";

    return this._http.post<Ask>(url, data);
  }
  getMyAsks(): Observable<Ask[]>{
    let url: string = this.envPath + "/employer/asks/my";
    return this._http.get<Ask[]>(url);
  }

  deleteAsk(id: string): Observable<string>{
    let url: string = this.envPath + "/ask/delete/" + id;
    return this._http.delete<string>(url);
  }

  getFilteredAsks(user: FullUser, pagesize?: number, page?: number): Observable<any>{
    let url: string = this.envPath + "/ask/all?";
    let categories = new Array();
    let languages = new Array();
    let software = new Array();
    let specs = new Array();
    let certifications = new Array();
    for(let cat of user.employee.categories)
    {
      //categories.push(cat.name)
       // url = url.slice(0, -1);
      if(url[url.length-1] == "?")
        url += "categories="+cat.name;
      else url+= "&categories="+cat.name;
    }
    // for(let lang of user.employee.languages)
    // {
    //   // languages.push(lang.name)
    //   if(url[url.length-1] == "?")
    //   url += "languages="+lang.name;
    //  else url+= "&languages="+lang.name;
    // }
    // for(let soft of user.employee.software)
    // {
    //   // software.push(soft.name)
    //   if(url[url.length-1] == "?")
    //   url += "software="+soft.name;
    //  else url+= "&software="+soft.name;
    // }
    // for(let spec of user.employee.specs)
    // {
    //   // specs.push(spec.name)
    //   if(url[url.length-1] == "?")
    //   url += "specs="+spec.name;
    //  else url+= "&specs="+spec.name;
    // }
    // for(let cert of user.employee.certifications)
    // {
    //   // certifications.push(cert.name)
    //   if(url[url.length-1] == "?")
    //   url += "certifications="+cert.name;
    //  else url+= "&certifications="+cert.name;
    // }
    // let obj = {"categories": categories,
    //            "languages": languages,
    //            "software": software,
    //            "specs": specs,
    //            "certifications": certifications,
    //            "pagesize": pagesize,
    //            "page": page};
      // console.log("Obiekt: "+JSON.stringify(obj))
      return this._http.get<any>(url);
  }

}
