import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserP2 } from '../models/userP2';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  
  templateUrl: './register-part-two.component.html',
  styleUrls: ['./register-part-two.component.css']
})
export class RegisterPartTwoComponent implements OnInit {

  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  typ: number;
  user: UserP2;

  constructor(private _route: ActivatedRoute, private _authService: AuthService, private _router: Router, private _profileService: ProfileService) { }

  ngOnInit() {
    this._profileService.getIdentity().subscribe(data => this.typ = data.user.status)
  }

  sendToF(): void{
    
      this.user = {
        first_name: this.first_name,
        last_name: this.last_name,
        phone: this.phone,
        city: this.city
      };
     // console.log("Uzytnik: "+JSON.stringify(this.user))
      this._authService.registerP2(this.user, this.typ).subscribe(data => this._router.navigate(['/registerP3']));
    }
     
  }

