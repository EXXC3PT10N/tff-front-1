import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import {GroupMessage, User, Message} from '../models/message.with';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {ScrollEvent} from 'ngx-scroll-event';
import {FirebaseMessagingService} from '../services/firebase.messaging.service';


@Component({
  selector: 'app-message.with',
  templateUrl: './message.with.component.html',
  styleUrls: ['./message.with.component.css']
})
export class MessageWithComponent implements OnInit {
  messages: Message[] = new Array();
  groupMessages: GroupMessage[] = new Array();
  userWith: User;
  userMe: User;
  count: number;
  page: number;
  pagesize: number;
  withId: string;
  textValue: string;
  basePath: string = environment.path;
  imageMe: string;
  imageWith: string;
  defaultImg: string = environment.defaultImage;
  loadMore: boolean;
  loading: boolean;

  constructor(private _messageService: MessageService,
              private _route: ActivatedRoute,
              private _firebaseMessage: FirebaseMessagingService) { }



  ngOnInit() {
    this.loading = true;
    this.loadMore = false;
    this.pagesize = 15;
    this.page = 0;
    this.getMessages();
    this._firebaseMessage.reciveMessage();
    this._firebaseMessage.getMessagingFunction().onMessage(payload => {
      let newMsg: Message = {
          is_read: false,
          content: payload['notification']['body'],
          _id: this.userWith._id,
          is_send: false,
          send_date: new Date(Date.now())
      };

      this.groupMsgsAddMessage(newMsg);
    });
  }

  getMessages(): void {
    this._route.params.subscribe(params => {
      this.withId = params.id;
      this._messageService.getMessagesWith(this.withId, this.page, this.pagesize).subscribe(
        res => {
          if (res.messages) {
            this.messages = res.messages.concat(this.messages);
            this.groupMessages = this.groupMsgs(this.messages);
            if (this.page === 0) {
              if (res.me) {
                this.userMe = res.me;
                this.imageMe = this.userMe.image || this.defaultImg;
              }
            }
          }
          if (this.page === 0) {
            this.userWith = res.with;
            this.imageWith =  this.userWith.image || this.defaultImg;
          }
          this.page++;
          this.count = res.count;
          this.loadMore = false;
          this.loading = false;
          this.scrollDown(500);
        },
        err => {
          console.error(err);
          this.loading = false;
        }
      )
    });
  }
  sendMessage() {
    let sendValue = this.textValue;
    this.textValue = '';
    this._messageService.sendMessage(sendValue, this.withId)
      .subscribe(res => {
        if (res.success) {
          this.messages.push(res.message);
          this.count++;
          this.groupMsgsAddMessage(res.message);
        } else {
          console.log(res.message);
        }
      });
  }
  onEnter(event) {
    if(event.keyCode === 13) {
      this.sendMessage();
    }
  }
  groupMsgs(msgs: Message[]): GroupMessage[] {
    let change = msgs[0].is_send;
    let returnGroups: GroupMessage[] = new Array();
    returnGroups.push({
      is_send: msgs[0].is_send,
      messages: [msgs[0]]
    });
    msgs.forEach((msg, index) => {
      if (index !== 0) {
        if (change !== msg.is_send) {
          returnGroups.push({
            is_send: msg.is_send,
            messages: [msg]
          });
          change = !change;
        } else {
          returnGroups[returnGroups.length - 1].messages.push(msg);
        }
      }
    });
    return returnGroups;
  }
  groupMsgsAddMessage(message: Message) {
    if (this.groupMessages.length === 0) {
      this.groupMessages.push({
        is_send: true,
        messages: [message]
      });
    } else
    if (this.groupMessages[this.groupMessages.length - 1].is_send !== message.is_send) {
      this.groupMessages.push({
        is_send: message.is_send,
        messages: [message]
      });
    } else {
      this.groupMessages[this.groupMessages.length - 1].messages.push(message);
    }
    this.scrollDown(250);
  }
  handleScroll(event: ScrollEvent): void {
    if (event.isReachingTop) {
      if (this.messages.length < this.count)
        this.getMessages();
    }
    if(document.getElementById('scroller').scrollTop < 150 && this.count > this.messages.length) {
      this.loadMore = true;
    }
    else {
      this.loadMore = false;
    }
  }
  scrollDown(time: number) {
    setTimeout(() => {
      document.getElementById('scroller').scrollTo(0, document.getElementById('scroller').scrollHeight);
    }, time);
  }
}
