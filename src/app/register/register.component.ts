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
  typ: number;


  constructor(private _authService: AuthService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.typ = +this._route.snapshot.paramMap.get('type');
  }

  sendToS(): void{
    if(this.pwd === this.pwd2 && isString(this.pwd)){
      this.komunikat = "";
      this.user = {
        username: this.login,
        password: this.pwd,
        email: this.email
      };
      this._authService.register(this.user).subscribe((data) => {
        if(data['token'])
          this._router.navigate(['/registerP2/'+this.typ]);
        else
          this.errorMessage = data["message"];
    });

    }
     else this.komunikat = "Hasła nie mogą się różnić!"
      
  }

}
