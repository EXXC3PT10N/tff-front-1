import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { UserProfile } from './userProfile';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';


@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  userProfile: UserProfile;
  imie: string;
  nazwisko: string;
  ocena: number;
  id: any;

  

  constructor(private _profileService: ProfileService, private _authService: AuthService, private _router: Router){}

  ngOnInit(): void {
      this._profileService.getIdentity().subscribe(userProfile => {
        this.imie = userProfile["user"].first_name;
        this.nazwisko = userProfile["user"].last_name;
        this.ocena = userProfile["user"].rate;
      });
  }

  logout() {
    this._authService.logout();
  }
}
