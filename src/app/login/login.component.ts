import { Component } from '@angular/core';

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

    onSubmit() {

    }
}