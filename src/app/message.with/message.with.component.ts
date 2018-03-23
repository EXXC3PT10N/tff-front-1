import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import {GroupMessage, User, Message} from '../models/message.with';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {ScrollEvent} from 'ngx-scroll-event';
import { AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-message.with',
  templateUrl: './message.with.component.html',
  styleUrls: ['./message.with.component.css']
})
export class MessageWithComponent implements OnInit, AfterViewInit {
  messages: Message[] = new Array();
  groupMessages: GroupMessage[];
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

  constructor(private _messageService: MessageService, private _route: ActivatedRoute, private _router: Router) { }


  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('scroller').scrollTo(0, document.getElementById('scroller').scrollHeight);
    }, 500);
  }

  ngOnInit() {
    this.loadMore = false;
    this.pagesize = 15;
    this.page = 0;
    this.getMessages();
  }

  getMessages(): void {
    this._route.params.subscribe(params => {
      this.withId = params.id;
      this._messageService.getMessagesWith(this.withId, this.page, this.pagesize).subscribe(
        res => {
          this.messages = res.messages.concat(this.messages);
          this.count = res.count;
          this.groupMessages = this.groupMsgs(this.messages);
          this.page++;
          this.userWith = res.with;
          this.userMe = res.me;
          this.imageWith = this.userWith !== null ? this.basePath + '/image/user/' + this.userWith.image : this.defaultImg;
          this.imageMe = this.userMe !== null ? this.basePath + '/image/user/' + this.userMe.image : this.defaultImg;
          this.loadMore = false;
        },
        err => {
          console.error(err);
        }
      )
    });
  }
  sendMessage() {
    console.log(this.textValue);
    this._messageService.sendMessage(this.textValue, this.withId)
      .subscribe(res => {
        if (res.success) {
          this.messages.push(res.message);
          this.groupMsgsAddMessage(res.message);
          this.count++;
          this.textValue = '';
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
    if (this.groupMessages[this.groupMessages.length - 1].is_send !== message.is_send) {
      this.groupMessages.push({
        is_send: message.is_send,
        messages: [message]
      });
    } else {
      this.groupMessages[this.groupMessages.length - 1].messages.push(message);
    }
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
}
