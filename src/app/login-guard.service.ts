import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    var can: boolean = false;

    this._authService.isAuthenticated()
    .then((isAuth) => {
      if(!isAuth) {
        this._router.navigate(['/home']);
      }
      else {
        can = true;
      }
    }).catch(err => console.log(err));

    return can;
    // if(!this._authService.token){
      
    //   return false;
    // } else return true;
      
  }

}
