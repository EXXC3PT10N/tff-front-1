import { Component } from '@angular/core';
import { UserPass } from '../userPass';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class loginComponent {
    enter_login: string = 'Your login';
    enter_pass: string = 'Your password';
    forgetUrl: string = ''; //link do reset password
    rememberMe: string = 'Remember me';
    submit: string = 'Log In';
    login: string;
    pass: string;
    user: UserPass;

    constructor(private _authService: AuthService, private _router: Router){}

    onSubmit() {
        this.user = {
            username: this.login,
            password: this.pass
          };
          this._authService.loginUser(this.user).subscribe(res => this._router.navigate(['/profile']));
          
          
          
    }
}