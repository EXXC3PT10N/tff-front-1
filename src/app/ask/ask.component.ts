import { Component, OnInit } from '@angular/core';
import { Ask } from '../models/ask';
import { AskService } from '../services/ask.service';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';


@Component({
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  ask: Ask = {
    "description": "",
    "salary": 0,
    "work_time": 0,
    "categories": [],
    "languages": [],
    "software": [],
    "specs": [],
    "certifications": []
};
  description: string;
  salary: number;
  work_time: number;
  categories = new Array();
  languages = new Array();
  software = new Array();
  specializations = new Array();
  certifications = new Array();
  title: string;
  
  categoriesNames;
  languagesNames;
  softwareNames;
  specializationsNames;
  certificationsNames;

  _categoriesFilter: string;
  _languagesFilter: string;
  _softwareFilter: string;
  _specializationsFilter: string;
  _certificationsFilter: string;

  filteredCategories: string[];
  filteredLanguages: string[];
  filteredSoftware: string[];
  filteredSpecializations: string[];
  filteredCertifications: string[];

  komunikat: string = "";
  

  constructor(private _askService: AskService, private _profileService: ProfileService, private _authService: AuthService) { }

  ngOnInit() {
    this._profileService.getCategoriesNames().subscribe(names => this.categoriesNames = names)
    this._profileService.getLanguagesNames().subscribe(names => this.languagesNames = names)
    this._profileService.getSoftwareNames().subscribe(names => this.softwareNames = names)
    this._profileService.getSpecializationsNames().subscribe(names => this.specializationsNames = names)
    this._profileService.getCertificationsNames().subscribe(names => this.certificationsNames = names)
  }

  get categoriesFilter(): string {
    return this._categoriesFilter;
  }
  
  set categoriesFilter(value: string) {
  this._categoriesFilter = value;
  this.filteredCategories = this.categoriesFilter ? this.performFilter(this.categoriesFilter, this.categoriesNames) : null;
  }

  get languagesFilter(): string {
    return this._languagesFilter;
  }
  
  set languagesFilter(value: string) {
  this._languagesFilter = value;
  this.filteredLanguages = this.languagesFilter ? this.performFilter(this.languagesFilter, this.languagesNames) : null;
  }

  get softwareFilter(): string {
    return this._softwareFilter;
  }
  
  set softwareFilter(value: string) {
  this._softwareFilter = value;
  this.filteredSoftware = this.softwareFilter ? this.performFilter(this.softwareFilter, this.softwareNames) : null;
  }

  get specializationsFilter(): string {
    return this._specializationsFilter;
  }
  
  set specializationsFilter(value: string) {
  this._specializationsFilter = value;
  this.filteredSpecializations = this.specializationsFilter ? this.performFilter(this.specializationsFilter, this.specializationsNames) : null;
  }

  get certificationsFilter(): string {
    return this._certificationsFilter;
  }
  
  set certificationsFilter(value: string) {
  this._certificationsFilter = value;
  this.filteredCertifications = this.certificationsFilter ? this.performFilter(this.certificationsFilter, this.certificationsNames) : null;
  }

  performFilter(filterBy: string, variable: string[]): string[] {
    filterBy = filterBy.toLocaleLowerCase();
    return variable.filter((F: string) =>
          F['name'].toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  createAsk(): void{
   // let ask = this.getObjectAsk();
     
    this.ask.description = this.description;
    this.ask.salary = this.salary;
    this.ask.work_time = this.work_time;
    this.ask.title = this.title;
    this.categories.forEach(element => {
      this.ask.categories.push(element.name);
    })
    this.languages.forEach(element => {
      this.ask.languages.push(element.name);
    })
    this.software.forEach(element => {
      this.ask.software.push(element.name);
    })
    this.specializations.forEach(element => {
      this.ask.specs.push(element.name);
    })
    this.certifications.forEach(element => {
      this.ask.certifications.push(element.name);
    })

    this._askService.addAsk(this.ask).subscribe();
    // TODO Dodac if'a 
    this.cleanSite();
    this.komunikat = "Udało się utworzyć ogłoszenie!";
  
  }

  
  addCategories(name: string): void{
    let nowy = {"categories": new Array()};
    for(let userCat of this.categories)
      nowy.categories.push(userCat.name);
    nowy.categories.push(name);
    let tmp = { "name": nowy.categories[nowy.categories.length-1] }
    this.categories.push(tmp);
    
  }

  deleteCategories(name: string){
    let obj = {"name": name};
    let pos = this.categories.map(function(e) { return e.name; }).indexOf(name);
    
    if(pos > -1)
      this.categories.splice(pos, 1);
  }

  addLanguages(name: string): void{
    let nowy = {"languages": new Array()};
    for(let userLang of this.languages)
      nowy.languages.push(userLang.name);
    nowy.languages.push(name);
    let tmp = { "name": nowy.languages[nowy.languages.length-1] }
    this.languages.push(tmp);
    
  }

  deleteLanguages(name: string){
    let obj = {"name": name};
    let pos = this.languages.map(function(e) { return e.name; }).indexOf(name);
    
    if(pos > -1)
      this.languages.splice(pos, 1);
  }
  
  addSoftware(name: string): void{
    let nowy = {"software": new Array()};
    for(let userSoft of this.software)
      nowy.software.push(userSoft.name);
    nowy.software.push(name);
    let tmp = { "name": nowy.software[nowy.software.length-1] }
    this.software.push(tmp);
    
  }

  deleteSoftware(name: string){
    let obj = {"name": name};
    let pos = this.software.map(function(e) { return e.name; }).indexOf(name);
    
    if(pos > -1)
      this.software.splice(pos, 1);
  }

  addSpecializations(name: string): void{
    let nowy = {"specializations": new Array()};
    for(let userSpec of this.specializations)
      nowy.specializations.push(userSpec.name);
    nowy.specializations.push(name);
    let tmp = { "name": nowy.specializations[nowy.specializations.length-1] }
    this.specializations.push(tmp);
    
  }

  deleteSpecializations(name: string){
    let obj = {"name": name};
    let pos = this.specializations.map(function(e) { return e.name; }).indexOf(name);
    
    if(pos > -1)
      this.specializations.splice(pos, 1);
  }

  addCertifications(name: string): void{
    let nowy = {"certifications": new Array()};
    for(let userCert of this.certifications)
      nowy.certifications.push(userCert.name);
    nowy.certifications.push(name);
    let tmp = { "name": nowy.certifications[nowy.certifications.length-1] }
    this.certifications.push(tmp);
    
  }

  deleteCertifications(name: string){
    let obj = {"name": name};
    let pos = this.certifications.map(function(e) { return e.name; }).indexOf(name);
    
    if(pos > -1)
      this.certifications.splice(pos, 1);
  }

  cleanSite(): void{
    this.description = "";
    this.salary = 0;
    this.work_time = 0;
    this.categories = [];
    this.categoriesFilter = "";
    this.languages = [];
    this.languagesFilter = "";
    this.software = [];
    this.softwareFilter = "";
    this.specializations = [];
    this.specializationsFilter = "";
    this.certifications = [];
    this.certificationsFilter = "";
    this.title = ""
  }

  logout() {
    this._authService.logout();
  }


}
