import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {environment} from "../../environments/environment";
import { Ask } from '../models/ask';

// /api/auth/id => id

@Injectable()
export class BidService {
  envPath: string = environment.path + "/api";

  constructor(private _http: HttpClient) { }

  createBid(id: string, description: string, salary: number): Observable<any>{
    let url: string = this.envPath + "/bid/create/" +id;
    let obj = {
      "description": description,
      "salary": salary
    }
    console.log("Obiekt: "+JSON.stringify(obj))
    return  this._http.post<any>(url,obj)
  }

}
