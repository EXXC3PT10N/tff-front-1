import {Component, OnInit} from '@angular/core';
import {FirebaseMessagingService} from '../services/firebase.messaging.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../assets/assets_bid/css/Navigation-Clean.css']
})
export class NavbarComponent implements OnInit {
  hasNewMessages: boolean;

  constructor(private _firebaseMessage: FirebaseMessagingService, private _authService: AuthService){}

  ngOnInit(): void {
    this._firebaseMessage.getMessagingFunction().onMessage(data => {
      this.hasNewMessages = true;
    });
  }
  logout() {
    this._authService.logout();
  }
}
