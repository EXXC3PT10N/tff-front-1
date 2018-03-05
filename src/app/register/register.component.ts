import { Component, OnInit } from '@angular/core';
import { isNull, isString } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  login: string;
  pwd: string;
  pwd2: string;
  komunikat: string;


  constructor() { }

  ngOnInit() {
  }

  sendToS(): void{
    if(this.pwd === this.pwd2 && isString(this.pwd)){

      
    }
     else this.komunikat = "Hasła nie mogą się różnić!"
      
  }

}
