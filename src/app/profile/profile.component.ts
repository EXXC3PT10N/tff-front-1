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
  languages: string[];
  _langFilter: string;
  filteredLanguages: string[];
  userLanguages;
  
  constructor(private _profileService: ProfileService, private _authService: AuthService, private _router: Router){}

  ngOnInit(): void {
      this._profileService.getIdentity().subscribe(userProfile => {
        this.imie = userProfile["user"].first_name;
        this.nazwisko = userProfile["user"].last_name;
        this.ocena = userProfile["user"].rate;
      });
      this._profileService.getLanguagesNames().subscribe(languages => this.languages = languages);
      this._profileService.getUserLanguages().subscribe(userLanguages => { 
        this.userLanguages = userLanguages.employee.languages;
        console.log(JSON.stringify(this.userLanguages))});
  }


  logout() {
    this._authService.logout();
  }

  get langFilter(): string {
    return this._langFilter;
}

set langFilter(value: string) {
  this._langFilter = value;
 // this.filteredLanguages = this.langFilter ? this.performFilter(this.langFilter) : this.languages;
  this.filteredLanguages = this.langFilter ? this.performFilter(this.langFilter) : null;
}

performFilter(filterBy: string): string[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.languages.filter((language: string) =>
        language['name'].toLocaleLowerCase().indexOf(filterBy) !== -1);
}

confirm(lang): void{
  
  this._profileService.setLanguages(lang).subscribe()
  
  //console.log(JSON.stringify(lang));
  // this._profileService.setLanguages("").subscribe()
  
  //console.log(JSON.stringify(this.userLanguages));
}
addLang(name: string): void{
  let lang = {"languages": new Array()};
  for(let userLanguage of this.userLanguages)
    lang.languages.push(userLanguage.name);
  lang.languages.push(name);
  let tmp = { "name": lang.languages[lang.languages.length-1] }
  this.userLanguages.push(tmp);
  this.confirm(lang);
}

deleteLang(name: string){
  // console.log("nazwa: "+name);
  // console.log(JSON.stringify(this.userLanguages));
  let obj = {"name": name};
  let pos = this.userLanguages.map(function(e) { return e.name; }).indexOf(name);
  if(pos > -1)
    this.userLanguages.splice(pos, 1);
  let lang = {"languages": new Array()};
  for(let userLanguage of this.userLanguages)
    lang.languages.push(userLanguage.name);
  this.confirm(lang);
  // console.log("Indeks: "+pos);
}

}
