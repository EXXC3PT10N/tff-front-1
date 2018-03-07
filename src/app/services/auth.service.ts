import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally'
import { UserP2 } from '../models/userP2';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";



@Injectable()
export class AuthService {
  private _authPath = environment.path + "/api/auth";
  private _registerUrl = this._authPath + "/register";
  private _loginUrl = this._authPath + "/login";
  private _registerP2Url = "";
  TOKEN_KEY: string = 'token';
  constructor(private _http: HttpClient, private _router: Router) { }


  register(user: User): Observable<User> {
   
   return this._http.post<any>(this._registerUrl, user)
   .do(res => this.saveToken(res.token))
   .catch(this.handleError);
  }

  registerP2(user: UserP2, typ: number): Observable<UserP2>{
    if(typ == 0)
      this._registerP2Url = environment.path + "/api/employee/create";
    if(typ == 1)
      this._registerP2Url = environment.path + "/api/employer/create";
      return this._http.post<any>(this._registerP2Url, user)
      .catch(this.handleError);
  }

  loginUser(loginData) : Observable<any> {
    return this._http.post<any>(this._loginUrl, loginData)
    .do(res => {
        this.saveToken(res.token);
    });
}

  checkPass(){

  }
  public logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this._router.navigate(["/login"]);
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
