import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {environment} from "../../environments/environment";
import { Ask } from '../models/ask';

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
    return this._http.post<string>(url,id);
  }

}
