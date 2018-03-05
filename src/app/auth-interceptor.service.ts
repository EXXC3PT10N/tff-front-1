import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req,next){
    console.log(req);
    return next.handle();
  }
  constructor() { }

}
