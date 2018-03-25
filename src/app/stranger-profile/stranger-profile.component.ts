import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfile } from '../profile/userProfile';
import { FullUser } from '../models/fullUser';
import { MatDialog } from '@angular/material';
import { RateService } from '../services/rate.service';
import { Rate } from '../models/rates';
import { StrangerProfileRateDialogComponent } from '../stranger-profile-rate-dialog/stranger-profile-rate-dialog.component';
import {environment} from '../../environments/environment';
import {FirebaseMessagingService} from '../services/firebase.messaging.service';


@Component({
  selector: 'app-stranger-profile',
  templateUrl: './stranger-profile.component.html',
  styleUrls: ['./stranger-profile.component.css']
})
export class StrangerProfileComponent implements OnInit {

  person: string;
  userProfile: UserProfile;
  imie: string;
  nazwisko: string;
  ocena: number;
  id: number;
  userLanguages;
  userSpec;
  userSoftware;
  userCertifications;
  compName:string;
  NIP:string;
  compCity:string;
  pracodawca: any;
  user: FullUser;
  userCategories;
  dialogResult: string;
  url: string;
  public loading = true;
  identyfikator: string;
  hasNewMessages: boolean;


  constructor(private _profileService: ProfileService,
              private _authService: AuthService,
              private _router: Router,
              private _route: ActivatedRoute,
              public dialog: MatDialog,
              private _rateService: RateService,
              private _firebaseMessage: FirebaseMessagingService) {
    this.identyfikator = this._route.snapshot.paramMap.get('id')
  }

  ngOnInit() {

    this._profileService.getStrangerIdentity(this.identyfikator).subscribe(userProfile => {
      this.user = userProfile;
      this.imie = userProfile["user"].first_name;
      this.nazwisko = userProfile["user"].last_name;
      this.ocena = userProfile.rate;
      this.id = userProfile['user'].status;
      this.url = userProfile.user.image || environment.defaultImage;

      if(this.id==0 && this.user.user.first_name){
        this.person = "Freelancer";
        this.userLanguages = userProfile.employee.languages
      this.userSpec = userProfile.employee.specs
      this.userSoftware = userProfile.employee.software
      this.userCertifications = userProfile.employee.certifications
      this.userCategories = this.user.employee.categories;
      this.loading = false;
      }else if(this.id==1 && this.user.user.first_name){
        this.person = "Pracodawca";
        console.log("Firmy: "+ JSON.stringify(this.user.employer.company));
        this.loading = false;
      }

    });
    this._firebaseMessage.getMessagingFunction().onMessage(data => {
      this.hasNewMessages = true;
    })
  }

  logout() {
    this._authService.logout();
  }

  openRateDialog(value: number): void{
    let dialogRef = this.dialog.open(StrangerProfileRateDialogComponent, {
      width: '600px',
      data: {username: this.user.user.username,value: value, description: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result.status}`);
      this.dialogResult = result;

      if(result.status == "Confirm")
      {
        let obj: Rate = {
          description: result.result.description,
          grade: result.result.value,
          user_to: this.identyfikator
        }
        this._rateService.rate(obj).subscribe();
      }
    });

  }

}
