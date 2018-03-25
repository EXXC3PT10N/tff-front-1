import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {environment} from '../../environments/environment';
import { Ask } from '../models/ask';
import { FullUser } from '../models/fullUser';

// /api/auth/id => id

@Injectable()
export class AskService {
  envPath: string = environment.path + '/api';

  constructor(private _http: HttpClient) { }

  addAsk(data: Ask): Observable<Ask>{
    let url: string = this.envPath + '/ask/create';

    return this._http.post<Ask>(url, data);
  }
  getMyAsks(): Observable<Ask[]>{
    let url: string = this.envPath + '/employer/asks/my';
    return this._http.get<Ask[]>(url);
  }

  deleteAsk(id: string): Observable<string>{
    let url: string = this.envPath + '/ask/delete/' + id;
    return this._http.delete<string>(url);
  }

  getFilteredAsks(user: FullUser, pagesize?: number, page?: number): Observable<any>{
    let url: string = this.envPath + '/ask/all?';
    let categories = new Array();
    let languages = new Array();
    let software = new Array();
    let specs = new Array();
    let certifications = new Array();
    for(let cat of user.employee.categories)
    {
      //categories.push(cat.name)
       // url = url.slice(0, -1);
      if(url[url.length-1] == '?')
        url += 'categories='+cat.name;
      else url+= '&categories='+cat.name;
    }
      return this._http.get<any>(url);
  }

  getAsk(id: string): Observable<Ask>{
    let url: string = this.envPath + "/ask/" + id;
    console.log("Twoje url: "+url)
    return this._http.get<Ask>(url);
  }

  acceptBid(bid_id): Observable<any>{
    let url: string = this.envPath + "/bid/accept/"+bid_id;
    return this._http.post<any>(url, null);
  }

}
