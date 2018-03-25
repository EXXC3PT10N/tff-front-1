import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { UserProfile } from './userProfile';
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FullUser, Company } from '../models/fullUser';
import { DialogProfileComponent } from '../dialog-profile/dialog-profile.component';
import { MatDialog } from '@angular/material';
import { ProfileImageDialogComponent } from '../profile-image-dialog/profile-image-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProfileLinkDialogComponent } from '../profile-link-dialog/profile-link-dialog.component';
import { ProfileEducationDialogComponent } from '../profile-education-dialog/profile-education-dialog.component';
import { ProfileDescriptionDialogComponent } from '../profile-description-dialog/profile-description-dialog.component';
import { ProfileCityDialogComponent } from '../profile-city-dialog/profile-city-dialog.component';
import { RateService } from '../services/rate.service';
import { FirebaseMessagingService } from '../services/firebase.messaging.service';
import { ProfileCreateCompanyDialogComponent } from '../profile-create-company-dialog/profile-create-company-dialog.component';
import { ProfileEditCompanyDialogComponent } from '../profile-edit-company-dialog/profile-edit-company-dialog.component';
import {environment} from '../../environments/environment';


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
  userLanguages;
  specializations: string[];
  userSpec;
  software: string[];
  userSoftware;
  certifications: string[];
  userCertifications;
  compName:string;
  NIP:string;
  compCity:string;
  pracodawca: any;
  user: FullUser;
  categories: string[];
  userCategories;
  hasNewMessages: boolean;

  dialogResult: string;
  url: string;
  public loading = true;


  constructor(private _profileService: ProfileService,
              private _authService: AuthService,
              private _router: Router,
              public dialog: MatDialog,
              private _http: HttpClient,
              private _rateService: RateService,
              private _firebaseMessage: FirebaseMessagingService){}

  ngOnInit(): void {
      
      
      this._profileService.getIdentity().subscribe(userProfile => {
        this.user = userProfile;
        this.imie = userProfile["user"].first_name;
        this.nazwisko = userProfile["user"].last_name;
        this.ocena = userProfile.rate;
        this.id = userProfile['user'].status;
        this.url = userProfile.user.image || environment.defaultImage;
        this.hasNewMessages = userProfile.user.unread_messages > 0;
        console.log("User: "+JSON.stringify(this.user))

        if (this.id==0 && this.user.user.first_name) {
          this.person = "Freelancer";
        this._profileService.getLanguagesNames().subscribe(languages => this.languages = languages);

          this.userLanguages = userProfile.employee.languages
        this._profileService.getSpecializationsNames().subscribe(specializations => this.specializations = specializations)
        this.userSpec = userProfile.employee.specs
        this._profileService.getSoftwareNames().subscribe(software => this.software = software);
        this.userSoftware = userProfile.employee.software
        this._profileService.getCertificationsNames().subscribe(certifications => this.certifications = certifications);
        this.userCertifications = userProfile.employee.certifications
        this._profileService.getCategoriesNames().subscribe(categories => this.categories = categories);
        this.userCategories = this.user.employee.categories;
        this.loading = false;
        console.log("Twoje id: "+this.user.user._id)
       } else if (this.id==1 && this.user.user.first_name) {
          this.person = "Pracodawca";
          this._profileService.company.getAllComp().subscribe(comp => {
            this.user.employer.company = comp;
            console.log("Firmy: "+ JSON.stringify(this.user.employer.company));
          });

          this.loading = false;
        }

        this._firebaseMessage.getPermission(this.user.user._id);
        this._firebaseMessage.getMessagingFunction().onMessage(data => {
        this.hasNewMessages = true;
        });
      });
    
  }


  logout() {
    this._authService.logout();
  }


confirmLang(lang): void{

  this._profileService.updateEmployee(lang).subscribe()

}

confirmSpec(spec): void{
  this._profileService.updateEmployee(spec).subscribe()
}

confirmSoftware(software): void{
  this._profileService.updateEmployee(software).subscribe()
}

confirmCertifications(certifications): void{
  this._profileService.updateEmployee(certifications).subscribe()
}

confirmCategories(categories): void{

  this._profileService.updateEmployee(categories).subscribe()

}

createComp(): void{
  let comp = {"name": this.compName,
              "NIP": this.NIP,
              "city": this.compCity};
  this._profileService.company.create(comp).subscribe();
  this.user.employer.company.push(comp);
}

// deleteComp(nip: string): void{
//   this._profileService.company.delete(nip).subscribe();
//   console.log("wybrales NIP: "+data)
//   let pos = this.user.employer.company.map(function(e) { return e.NIP }).indexOf(data);
//   if(pos > -1)
//     this.user.employer.company.splice(pos,1);
// }

openDialog(tytul: string, tab, jsonName: string, tabNames: string[]) {
  let dialogRef = this.dialog.open(DialogProfileComponent, {
    width: '600px',
    data: {title: tytul, content: {presents: tab},jsonName: jsonName, tabNames: tabNames}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result}`);
    this.dialogResult = result;

    if(result == "Confirm")
    {
      switch(jsonName){
        case 'categories': {
          let nowy = {"categories": new Array()};
          for(let userCat of this.userCategories)
            {
              console.log("Nazwa: "+userCat.name)
              nowy.categories.push(userCat.name);}
          this.confirmCategories(nowy);
          // console.log(JSON.stringify(nowy))
          break;
        }
        case 'languages': {
          let nowy = {"languages": new Array()};
          for(let userLang of this.userLanguages)
            {
              console.log("Nazwa: "+userLang.name)
              nowy.languages.push(userLang.name);}
          this.confirmLang(nowy);
          // console.log(JSON.stringify(nowy))
          break;
        }
        case 'software': {
          let nowy = {"software": new Array()};
          for(let userSoft of this.userSoftware)
            {
              console.log("Nazwa: "+userSoft.name)
              nowy.software.push(userSoft.name);}
          this.confirmSoftware(nowy);
          // console.log(JSON.stringify(nowy))
          break;
        }
        case 'specs': {
          let nowy = {"specs": new Array()};
          for(let userSp of this.userSpec)
            {
              console.log("Nazwa: "+userSp.name)
              nowy.specs.push(userSp.name);}
          this.confirmSpec(nowy);
          // console.log(JSON.stringify(nowy))
          break;
        }
        case 'certifications': {
          let nowy = {"certifications": new Array()};
          for(let userCert of this.userCertifications)
            {
              console.log("Nazwa: "+userCert.name)
              nowy.certifications.push(userCert.name);}
          this.confirmCategories(nowy);
          // console.log(JSON.stringify(nowy))
          break;
        }
        default: console.log("Błąd");
      }
    }

  });
}
openProfileImageDialog() {
  let dialogRef = this.dialog.open(ProfileImageDialogComponent, {
    width: '600px',
    data: {formData: FormData}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result}`);
    this.dialogResult = result;
    if(result == "Confirm")
    {
      window.location.reload();
    }
  });
}
openProfileLinkDialog(link: string, title: string, jsonName: string) {
  let dialogRef = this.dialog.open(ProfileLinkDialogComponent, {
    width: '600px',
    data: {title: title,link: link}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result.status}`);
    this.dialogResult = result;

    if(result.status == "Confirm")
    {
      var obj;
      switch(jsonName){
        case 'portfolio_link': {
          obj = {portfolio_link: result.result}
          this.user.employee.portfolio_link = obj.portfolio_link;
          break;
        }
        case 'git_link': {
          obj = {git_link: result.result}
          if(this.id==0)
            this.user.employee.git_link = obj.git_link;
          else if(this.id==1)
            this.user.employer.git_link = obj.git_link;
          break;
        }
        case 'linked_in_link': {
          obj = {linked_in_link: result.result};
          if(this.id==0)
            this.user.employee.linked_in_link = obj.linked_in_link;
          else if(this.id==1)
            this.user.employer.linked_in_link = obj.linked_in_link;
          break;
        }
      }
      if(this.id==0)
        this._profileService.updateEmployee(obj).subscribe();
      else if(this.id==1)
        this._profileService.updateEmployer(obj).subscribe();
    }
  });
}
openProfileEducationDialog() {
  let dialogRef = this.dialog.open(ProfileEducationDialogComponent, {
    width: '600px',
    data: {education: this.user.employee.education}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result.status}`);
    this.dialogResult = result;

    if(result.status == "Confirm")
    {
      // console.log("Wyksztalcenie: "+result.result);
      this.user.employee.education = result.result;
      let obj = {education: result.result};
      this._profileService.updateEmployee(obj).subscribe()

    }
  });
}
openProfileDescriptionDialog() {
  let dialogRef = this.dialog.open(ProfileDescriptionDialogComponent, {
    width: '600px',
    data: {description: this.user.employee.description}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result.status}`);
    this.dialogResult = result;

    if(result.status == "Confirm")
    {
      // console.log("Wyksztalcenie: "+result.result);
      this.user.employee.description = result.result;
      let obj = {description: result.result};
      this._profileService.updateEmployee(obj).subscribe()

    }
  });
}

openProfileCityDialog() {
  let dialogRef = this.dialog.open(ProfileCityDialogComponent, {
    width: '600px',
    data: {city: this.user.user.city}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result.status}`);
    this.dialogResult = result;

    if(result.status == "Confirm")
    {
      // console.log("Wyksztalcenie: "+result.result);
      this.user.user.city = result.result;
      let obj = {city: result.result};
      this._profileService.updateUser(obj).subscribe()

    }
  });
}

openProfileCreateCompanyDialog() {
  let dialogRef = this.dialog.open(ProfileCreateCompanyDialogComponent, {
    width: '600px',
    data: {
      name: '',
      NIP: 0,
      city: ''
  }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result.status}`);
    this.dialogResult = result.status;

    if(result.status == "Confirm")
    {
      this.compName = result.result.name;
      this.NIP = result.result.NIP;
      this.compCity = result.result.city;
      this.createComp();
    }
  });
}

openProfileEditCompanyDialog(_id: string, firma: Company) {
  let dialogRef = this.dialog.open(ProfileEditCompanyDialogComponent, {
    width: '600px',
    data: {
      name: firma.name,
      NIP: firma.NIP,
      city: firma.city
  }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result.status}`);
    this.dialogResult = result.status;

    if(result.status == "Confirm")
    {
      this._profileService.company.update(_id,result.result).subscribe()
    } else if(result.status == "Delete")
    {
      this._profileService.company.delete(_id).subscribe();
    }
  });
}


}
