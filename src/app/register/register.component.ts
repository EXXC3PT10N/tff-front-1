import { Component, OnInit } from '@angular/core';
import { isNull, isString } from 'util';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string;
  email: string;
  login: string;
  pwd: string;
  pwd2: string;
  komunikat: string;
  user: User;


  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  sendToS(): void{
    if(this.pwd === this.pwd2 && isString(this.pwd)){
      this.komunikat = "";
      this.user = {
        username: this.login,
        password: this.pwd,
        email: this.email
      };
      this._authService.register(this.user).subscribe(
        user => this.user = user
      );
        
      this._router.navigate(['/registerP2']);
      
    }
     else this.komunikat = "Hasła nie mogą się różnić!"
      
  }

}
