import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserProfile } from './userProfile';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{  
  userProfile: UserProfile;
  imie: string; 
  nazwisko: string; 
  ocena: number;
  id: string;

  

  constructor(private _profileService: ProfileService){}

  ngOnInit(): void{
    this._profileService.getId().subscribe(id => {
      this.id = id.user_id;
      console.log("Twoje id: " + this.id);
      this._profileService.getIdentity(this.id).subscribe(userProfile => { 
        this.imie = userProfile.first_name;
        this.nazwisko = userProfile.last_name;
        this.ocena = userProfile.rate;
      })
    })
    
  }

}
