import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { UserP2 } from './userP2';


@Injectable()
export class AuthService {
  private _authUrl = "http://192.168.10.201:3000/api/auth/register";
  private _registerP2Url = "";
  TOKEN_KEY: string = 'token';
  constructor(private _http: HttpClient) { }


  register(user: User): Observable<User> {
   
   return this._http.post<any>(this._authUrl, user)
   .do(res => this.saveToken(res.token))
   .catch(this.handleError);
  }

  registerP2(user: UserP2, typ: number): Observable<UserP2>{
    if(typ == 0)
      this._registerP2Url = "http://192.168.10.201:3000/api/create/employee";
    if(typ == 1)
      this._registerP2Url = "http://192.168.10.201:3000/api/create/employer";
      return this._http.post<any>(this._registerP2Url, user)
      .do(res => this.saveToken(res.token))
      .catch(this.handleError);
  }

  checkPass(){

  }

  private handleError(err: HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY)
  }
  
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token)
}

}
