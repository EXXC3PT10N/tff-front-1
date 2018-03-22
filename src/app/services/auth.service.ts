import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally'
import 'rxjs/add/observable/throw';
import { UserP2 } from '../models/userP2';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';



@Injectable()
export class AuthService {
  envPath = environment.path + '/api';
  private _authPath = environment.path + '/api/auth';
  private _registerUrl = this._authPath + '/register';
  private _loginUrl = this._authPath + '/login';
  TOKEN_KEY: string = 'token';
  TYPE_KEY: string = 'type';
  constructor(private _http: HttpClient, private _router: Router) { }


  register(user: User): Observable<User> {
   return this._http.post<any>(this._registerUrl, user)
   .do(res =>{ this.saveToken(res.token, res.type); console.log(res)})
   .catch(this.handleError);

  }

  registerP2(user: UserP2, status: number): Observable<UserP2>{
    var url: string = this.envPath;
    if(status === 0)
      url +=  '/employee/create';
    else if(status === 1)
      url +=  '/employer/create';

      return this._http.post<any>(url, user)
      .catch(this.handleError);
  }

  userUpdate(user: UserP2): Observable<UserP2>{
    let url: string = this.envPath + '/user/update';
    console.log('Uzytnik: '+JSON.stringify(user))
    return this._http.post<any>(url,user)
  }

  loginUser(loginData) : Observable<any> {
    return this._http.post<any>(this._loginUrl, loginData)
    .do(res => {
        if(res.token)
        this.saveToken(res.token, res.type);
    });
}

  checkPass(){

  }
  public logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TYPE_KEY);
    this._router.navigate(['/login']);
  }
  private handleError(err: HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  saveToken(token, type) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.TYPE_KEY, type);
  }



}
