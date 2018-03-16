import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { UserProfile } from './userProfile';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import { FullUser } from '../models/fullUser';



@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  person: string;
  userProfile: UserProfile;
  imie: string;
  nazwisko: string;
  ocena: number;
  id: number;
  languages: string[];
  _langFilter: string;
  filteredLanguages: string[];
  userLanguages;
  specializations: string[];
  _specFilter: string;
  filteredSpecializations: string[];
  userSpec;
  software: string[];
  _softwareFilter: string;
  filteredSoftware: string[];
  userSoftware;
  certifications: string[];
  _certificationsFilter: string;
  filteredCertifications: string[];
  userCertifications;
  compName:string;
  NIP:string;
  compCity:string;
  pracodawca: any;
  user: FullUser;
  categories: string[];
  _categoriesFilter: string;
  filteredCategories: string[];
  userCategories;

  
  constructor(private _profileService: ProfileService, private _authService: AuthService, private _router: Router){}

  ngOnInit(): void {
      this._profileService.getIdentity().subscribe(userProfile => {
        this.user = userProfile;
        this.imie = userProfile["user"].first_name;
        this.nazwisko = userProfile["user"].last_name;
        this.ocena = userProfile["user"].rate;
        this.id = userProfile['user'].status;
        

        if(this.id==0){
          this.person = "Freelancer";
        this._profileService.getLanguagesNames().subscribe(languages => this.languages = languages);
        this._profileService.getUserLanguages().subscribe(userLanguages => { 
          this.userLanguages = userLanguages.employee.languages });
        this._profileService.getSpecializationsNames().subscribe(specializations => this.specializations = specializations)
        this._profileService.getUserSpec().subscribe(userSpec => this.userSpec = userSpec.employee.specs);
        this._profileService.getSoftwareNames().subscribe(software => this.software = software);
        this._profileService.getUserSoftware().subscribe(userSoftware => this.userSoftware = userSoftware.employee.software);
        this._profileService.getCertificationsNames().subscribe(certifications => this.certifications = certifications);
        this._profileService.getUserCertifications().subscribe(userCertifications => this.userCertifications = userCertifications.employee.certifications);
        this._profileService.getCategoriesNames().subscribe(categories => this.categories = categories);
        this.userCategories = this.user.employee.categories;
        }else if(this.id==1){
          this.person = "Pracodawca";
          console.log("Firmy: "+ JSON.stringify(this.user.employer.company));
        } 

      });
  }

get langFilter(): string {
  return this._langFilter;
}

set langFilter(value: string) {
  this._langFilter = value;
  this.filteredLanguages = this.langFilter ? this.performFilter(this.langFilter, this.languages) : null;
}

get specFilter(): string {
  return this._specFilter;
}

set specFilter(value: string) {
this._specFilter = value;
this.filteredSpecializations = this.specFilter ? this.performFilter(this.specFilter, this.specializations) : null;
}

get softwareFilter(): string {
  return this._softwareFilter;
}

set softwareFilter(value: string) {
this._softwareFilter = value;
this.filteredSoftware = this.softwareFilter ? this.performFilter(this.softwareFilter, this.software) : null;
}

get certificationsFilter(): string {
  return this._certificationsFilter;
}

set certificationsFilter(value: string) {
this._certificationsFilter = value;
this.filteredCertifications = this.certificationsFilter ? this.performFilter(this.certificationsFilter, this.certifications) : null;
}

get categoriesFilter(): string {
  return this._categoriesFilter;
}

set categoriesFilter(value: string) {
this._categoriesFilter = value;
this.filteredCategories = this.categoriesFilter ? this.performFilter(this.categoriesFilter, this.categories) : null;
}

  logout() {
    this._authService.logout();
  }

  

performFilter(filterBy: string, variable: string[]): string[] {
  filterBy = filterBy.toLocaleLowerCase();
  return variable.filter((F: string) =>
        F['name'].toLocaleLowerCase().indexOf(filterBy) !== -1);
}

confirmLang(lang): void{
  
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
  this.confirmLang(lang);
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
  this.confirmLang(lang);
  // console.log("Indeks: "+pos);
}

confirmSpec(spec): void{
  
  this._profileService.setSpecializations(spec).subscribe()
  
  //console.log(JSON.stringify(lang));
  // this._profileService.setLanguages("").subscribe()
  
  //console.log(JSON.stringify(this.userLanguages));
}
addSpec(name: string): void{
  let nowy = {"specs": new Array()};
  for(let userSpec of this.userSpec)
    nowy.specs.push(userSpec.name);
  nowy.specs.push(name);
  console.log(JSON.stringify(nowy));
  let tmp = { "name": nowy.specs[nowy.specs.length-1] }
  this.userSpec.push(tmp);
  this.confirmSpec(nowy);
}

deleteSpec(name: string){
  // console.log("nazwa: "+name);
  // console.log(JSON.stringify(this.userLanguages));
  let obj = {"name": name};
  let pos = this.userSpec.map(function(e) { return e.name; }).indexOf(name);
  
  if(pos > -1)
    this.userSpec.splice(pos, 1);
  let spec = {"specs": new Array()};
  for(let userSpec of this.userSpec)
    spec.specs.push(userSpec.name);

  this.confirmSpec(spec);
  // console.log("Indeks: "+pos);
}

confirmSoftware(software): void{
  
  this._profileService.setSoftware(software).subscribe()
  
  //console.log(JSON.stringify(lang));
  // this._profileService.setLanguages("").subscribe()
  
  //console.log(JSON.stringify(this.userLanguages));
}
addSoftware(name: string): void{
  let nowy = {"software": new Array()};
  for(let userSoft of this.userSoftware)
    nowy.software.push(userSoft.name);
  nowy.software.push(name);
  console.log(JSON.stringify(nowy));
  let tmp = { "name": nowy.software[nowy.software.length-1] }
  this.userSoftware.push(tmp);
  this.confirmSoftware(nowy);
}

deleteSoftware(name: string){
  // console.log("nazwa: "+name);
  // console.log(JSON.stringify(this.userLanguages));
  let obj = {"name": name};
  let pos = this.userSoftware.map(function(e) { return e.name; }).indexOf(name);
  
  if(pos > -1)
    this.userSoftware.splice(pos, 1);
  let soft = {"software": new Array()};
  for(let userSoft of this.userSoftware)
    soft.software.push(userSoft.name);
  this.confirmSoftware(soft);
  // console.log("Indeks: "+pos);
}

confirmCertifications(certifications): void{
  
  this._profileService.setCertifications(certifications).subscribe()
  
  //console.log(JSON.stringify(lang));
  // this._profileService.setLanguages("").subscribe()
  
  //console.log(JSON.stringify(this.userLanguages));
}
addCertifications(name: string): void{
  let nowy = {"certifications": new Array()};
  for(let userCert of this.userCertifications)
    nowy.certifications.push(userCert.name);
  nowy.certifications.push(name);
  console.log(JSON.stringify(nowy));
  let tmp = { "name": nowy.certifications[nowy.certifications.length-1] }
  this.userCertifications.push(tmp);
  this.confirmCertifications(nowy);
}

deleteCertifications(name: string){
  // console.log("nazwa: "+name);
  // console.log(JSON.stringify(this.userLanguages));
  let obj = {"name": name};
  let pos = this.userCertifications.map(function(e) { return e.name; }).indexOf(name);
  
  if(pos > -1)
    this.userCertifications.splice(pos, 1);
  let cert = {"certifications": new Array()};
  for(let userCert of this.userCertifications)
    cert.certifications.push(userCert.name);
  this.confirmCertifications(cert);
  // console.log("Indeks: "+pos);
}

confirmCategories(categories): void{
  
  this._profileService.setCategories(categories).subscribe()
  
}
addCategories(name: string): void{
  let nowy = {"categories": new Array()};
  for(let userCat of this.userCategories)
    nowy.categories.push(userCat.name);
  nowy.categories.push(name);
  console.log(JSON.stringify(nowy));
  let tmp = { "name": nowy.categories[nowy.categories.length-1] }
  this.userCategories.push(tmp);
  this.confirmCategories(nowy);
}

deleteCategories(name: string){
  let obj = {"name": name};
  let pos = this.userCategories.map(function(e) { return e.name; }).indexOf(name);
  
  if(pos > -1)
    this.userCategories.splice(pos, 1);
  let cat = {"categories": new Array()};
  for(let userCat of this.userCategories)
    cat.categories.push(userCat.name);
  this.confirmCategories(cat);
  // console.log("Indeks: "+pos);
}



createComp(): void{
  let comp = {"name": this.compName,
              "NIP": this.NIP,
              "city": this.compCity};
  this._profileService.company.create(comp).subscribe();
  this.user.employer.company.push(comp);
}

deleteComp(data: string): void{
  this._profileService.company.delete(data).subscribe();
  //console.log("wybrales NIP: "+data)
  let pos = this.user.employer.company.map(function(e) { return e.NIP }).indexOf(data);
  if(pos > -1)
    this.user.employer.company.splice(pos,1);
}


}
