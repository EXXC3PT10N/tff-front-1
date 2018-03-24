import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs/Observable';
import { Rate, Rates } from "../models/rates"
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RateService {
  envPath: string = environment.path;

  constructor(private _http: HttpClient) { }

  rate(ocena: Rate): Observable<Rate>{
    let url: string = this.envPath + "/api/user/rate";
    return this._http.post<Rate>(url, ocena)
  }

  getRates(user_id: string): Observable<Rates>{
    let url: string = this.envPath + "/api/user/"+ user_id +"/rates";
    return this._http.get<Rates>(url);
  }

}
