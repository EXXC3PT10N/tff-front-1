import {Component, OnInit} from '@angular/core';
import {FirebaseMessagingService} from '../services/firebase.messaging.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../assets/assets_bid/css/Navigation-Clean.css']
})
export class NavbarComponent implements OnInit {
  hasNewMessages: boolean;

  constructor(private _firebaseMessage: FirebaseMessagingService){}

  ngOnInit(): void {
    this._firebaseMessage.getMessagingFunction().onMessage(data => {
      this.hasNewMessages = true;
    });
  }
}
