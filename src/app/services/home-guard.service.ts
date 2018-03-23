import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class HomeGuardService {

  constructor(private _authService: AuthService, private _router: Router) { }
  
  canActivate(): boolean{
    if(this._authService.token)
    {
      this._router.navigate(['/profile']);
      return false;
    }
    return true
  }
}
