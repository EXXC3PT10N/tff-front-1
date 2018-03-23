import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';


@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router, private _profile: ProfileService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if(!this._authService.token) {
      this._router.navigate(['/login']);
      return false;
    } else {
      this._profile.getIdentity().subscribe(user => {
        if(!user.user.first_name || !user.user.last_name || !user.user.phone || !user.user.city)
          this._router.navigate(['/registerP2'])
      })
    }
   return true;
    
    
  }

  

}
