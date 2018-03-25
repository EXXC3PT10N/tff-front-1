import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/take';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class FirebaseMessagingService {

  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  constructor(private _db: AngularFireDatabase, private _authFirebase: AngularFireAuth) {

  }

  updateToken(uid, token) {
        const data = {[uid]: token};
        this._db.object('fcmTokens/').update(data)
          .then(() => console.log('Token added to database'))
          .catch((err) => console.log('update token failed ', err));
  }
  getPermission(userId) {
    this.messaging.requestPermission()
      .then(() => {
        console.log('notification permission granted');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.updateToken(userId, token);
      })
      .catch((err) => {
        console.log('Unable to get permission');
      });
  }
  reciveMessage() {
    this.messaging.onMessage((payload) => {
      console.log('Message received ', payload);
      this.currentMessage.next(payload);
      });
  }
}
