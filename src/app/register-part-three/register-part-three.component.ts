import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-part-three',
  templateUrl: './register-part-three.component.html',
  styleUrls: ['./register-part-three.component.css']
})
export class RegisterPartThreeComponent implements OnInit {

  head_message: string = "Rejestracja przebiegła pomyślnie!";
  butt_message: string = "Zakończ";
  

  constructor(private _router: Router) { }

  ngOnInit() {
  }

}
