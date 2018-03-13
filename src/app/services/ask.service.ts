import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {environment} from "../../environments/environment";
import { Ask } from '../models/ask';

// /api/auth/id => id

@Injectable()
export class AskService {
  envPath: string = environment.path;

  constructor(private _http: HttpClient) { }

  addAsk(data: Ask): Observable<Ask>{
    let url: string = this.envPath + "/ask/create";

    return this._http.post<Ask>(url, data);
  }

}
