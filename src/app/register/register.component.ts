import { Component, OnInit } from '@angular/core';
import { isNull, isString } from 'util';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

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
  typ: number = 0;


  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  sendToS(): void{
    if(this.pwd === this.pwd2 && isString(this.pwd)){
      this.komunikat = "";
      this.user = {
        username: this.login,
        password: this.pwd,
        email: this.email,
        status: this.typ
      };
      this._authService.register(this.user).subscribe((data) => {
        if(data['token'])
          this._router.navigate(['/registerP2']);
        else
          this.errorMessage = data["message"];
    });

    }
     else this.komunikat = "Hasła nie mogą się różnić!"
      
  }
  setTyp(num: number): void{
    this.typ = num;
    //console.log("Typ: " + this.typ)
  }

}
