import { Component, OnInit } from '@angular/core';
import { Ask } from '../models/ask';
import { AskService } from '../services/ask.service';
import { ProfileService } from '../services/profile.service';


@Component({
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  ask: Ask;
  description: string;
  salary: number;
  work_time: number;
  categories = new Array()
  languages: string[];
  software: string[];
  specs: string[];
  certifications: string[];
  

  categoriesNames;
  languagesNames;
  softwareNames;
  specsNames;
  certificationsNames;

  _categoriesFilter: string;

  filteredCategories: string[];

  categoriesCounter: boolean[] = [true];
  languagesCounter: boolean[] = [true];
  softwareCounter: boolean[] = [true];
  specsCounter: boolean[] = [true];
  certificationsCounter: boolean[] = [true];
  

  constructor(private _askService: AskService, private _profileService: ProfileService) { }

  ngOnInit() {
    // this._profileService.getCategoriesNames().subscribe(names => this.categoriesNames = names)
    // this._profileService.getLanguagesNames().subscribe(names => this.languagesNames = names)
    // this._profileService.getSoftwareNames().subscribe(names => this.softwareNames = names)
    // this._profileService.getSpecializationsNames().subscribe(names => this.specsNames = names)
    // this._profileService.getCertificationsNames().subscribe(names => this.certificationsNames = names)
  }

  // get categoriesFilter(): string {
  //   return this._categoriesFilter;
  // }
  
  // set categoriesFilter(value: string) {
  // this._categoriesFilter = value;
  // this.filteredCategories = this.categoriesFilter ? this.performFilter(this.categoriesFilter, this.categoriesNames) : null;
  // }

  // performFilter(filterBy: string, variable: string[]): string[] {
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return variable.filter((F: string) =>
  //         F['name'].toLocaleLowerCase().indexOf(filterBy) !== -1);
  // }

  // getObjectAsk(): Ask{
    
  //   let ask: Ask;
  //   console.log("Opis: "+this.description)
  //   ask.description = this.description;
    
  //   ask.salary = this.salary;
  //   ask.work_time = this.work_time;
    
  //   this.categories.forEach(element => {
  //     ask.categories.push(element.name); 
  //   });
  //   // ask.languages = this.languages;
  //   // ask.software = this.software;
  //   // ask.specs = this.specs;
  //   // ask.certifications = this.certifications;
  //   return ask;
  // }

  createAsk(): void{
    // let ask = this.getObjectAsk();
     
    console.log("Opis: "+this.description);
    this.ask.description = this.description;
    this.ask.salary = this.salary;
    this.ask.work_time = this.work_time;
    
    console.log("Obiekt ask: "+JSON.stringify(this.ask));
    // this._askService.addAsk(ask).subscribe();
  }

  // addC(): void{
  //   this.categoriesCounter.push(true);
  // }
  
  // addCategories(name: string): void{
  //   let nowy = {"categories": new Array()};
  //   for(let userCat of this.categories)
  //     nowy.categories.push(userCat.name);
  //   nowy.categories.push(name);
  //   let tmp = { "name": nowy.categories[nowy.categories.length-1] }
  //   this.categories.push(tmp);
    
  // }

  // deleteCategories(name: string){
  //   let obj = {"name": name};
  //   let pos = this.categories.map(function(e) { return e.name; }).indexOf(name);
    
  //   if(pos > -1)
  //     this.categories.splice(pos, 1);
  
  // }
  
}
